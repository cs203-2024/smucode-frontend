"use client"

import dotenv from 'dotenv';
dotenv.config();

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import React, { useState, Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { getUserImageUploadLink, uploadUserImage } from '@/services/userAPI';
import { useUserContext } from '@/context/UserContext';

interface ImageUploaderProps {
    label: string,
    setPicture: React.Dispatch<React.SetStateAction<string>>
}
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function ImageUploader({ label, setPicture }:ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("/assets/images/default_profile.png");
    const [fileType, setFileType] = useState("");
    const { updateProfileImageUrl } = useUserContext();
    
    const s3Client = new S3Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
        },
    });

    async function getPresignedLink(type: string): Promise<{ uploadUrl: string; key: string }> {
        try {

            const response = await getUserImageUploadLink(type);            
            const { preSignedUrl, key } = response;

            // Uncomment to test frontend s3 client

            const putObjectCommand = new PutObjectCommand({
                Bucket: "brawlcode-assets",
                Key: key,
                ContentType: fileType
            });
          
            // Generate presigned URL with a 60-second expiration
            const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 300 });
            console.log("Presigned URL:", uploadUrl);
            console.log(response);
            
            // Change preSignedUrl to uploadUrl if testing s3Client
            return { uploadUrl: uploadUrl, key:key };
        } catch (error) {
            console.error("Unable to get presigned link: ", error);
            throw error;
        }
    }
    
    async function uploadToS3(uploadUrl: string) {
        try {
            console.log("Uploading to: "+uploadUrl);
            const headers: HeadersInit = {
                'Content-Type': fileType
            };
            console.log("Content Type is: ",fileType);
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: headers,
                body: file,
            });
            
            console.log(uploadResponse);
    
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file to S3');
            }
            console.log("Image successfully sent to generated link.");
        } catch (error) {
            console.error("Unable to upload to S3:", error);
            throw error;
        }
    }
    
    async function saveToBackend(key: string):Promise<string> {
        try {
            const response = await uploadUserImage(key);
            const { username, imageUrl } = response;
            return imageUrl;
        } catch (error) {
            console.error("Error saving to backend:", error);
            throw error;
        }
    }
    
    const uploadFile = async () => {
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }
    
        setUploading(true);
    
        try {
            // Step 1: Get the presigned link and key
            const getPresignedResponse = await getPresignedLink(file.type);
            const { uploadUrl, key } = getPresignedResponse; 
    
            // Step 2: Upload to S3 using the presigned URL
            await uploadToS3(uploadUrl);
    
            // Step 3: Save the file information to the backend
            const newImageUrl = await saveToBackend(key);
            console.log(newImageUrl);
            setPicture(newImageUrl);
            toast.success("Successfully updated image!");
            updateProfileImageUrl(newImageUrl);

        } catch (err) {
            console.error("Unable to upload file: ", err);
            toast.error("An error occurred during the upload process.");
        } finally {
            setUploading(false);
        }
    };
    

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className='py-4'>Update {label}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Update {label}</DialogTitle>
                    <DialogDescription>
                        Make changes to your {label.toLowerCase()} here. <br/>Images must have the following formats: .jpeg or .gif or .png. <br/>Click save when you&apos;re done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            New Image
                        </Label>
                        <Input
                            type="file" accept={ACCEPTED_IMAGE_TYPES.join(",")} 
                            id='image'
                            onChange={(e) => {
                                const newfile = e.target.files?.[0];
                                if (newfile && newfile instanceof File) {
                                    setFile(newfile);
                                    setFileType(newfile.type);
                                    console.log("File is: "+newfile.type);
                                    const objectUrl = URL.createObjectURL(newfile);
                                    setImagePreview(objectUrl);
                                }
                            }}
                            className='col-span-4'
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    {uploading ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                        </Button>
                    ):
                        file ? (
                            <Button type="submit" onClick={uploadFile}>Save changes</Button>
                        ):(
                            <Button type="submit" disabled>Save changes</Button>
                        )
                    }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}