"use client"

import React, { useState } from 'react';
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

interface ImageUploaderProps {
    label: string
}
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function ImageUploader({ label }:ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [presignedLink, setPresignedLink] = useState("");
    const [uploadKey, setUploadKey] = useState("");
    const [imagePreview, setImagePreview] = useState("/assets/images/default_profile.png");
    const [fileType, setFileType] = useState("");


    async function getPresignedLink(type: string) {
        try {
            const response = await getUserImageUploadLink(type);
            setPresignedLink(response.preSignedURL);
            setUploadKey(response.key);
            console.log(response);
        } catch(error) {
            console.error("Unable to get presigned link: ", error);
        }
    }

    async function uploadToS3(uploadUrl: string)  {
        try {
            const headers: HeadersInit = file?.type ? { 'Content-Type': file.type } : {};
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: headers,
                body: file,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file to S3');
            }

        } catch(error) {
            console.error("Unable to upload to S3:", error);
            toast.error("There was an error uploading to S3. Please try again.");
        }
    }
    async function saveToBackend(key: string) {
        try {
            const response = await uploadUserImage(key);
            toast.success("Successfully updated image!");
        } catch (error) {
            console.error("Error saving to backend:", error);
            toast.error("There was an error updating your image. Please try again.");
        }
    }

    const uploadFile = async () => {
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        setUploading(true);

        try {
        
            getPresignedLink(fileType);

            uploadToS3(presignedLink);

            saveToBackend(uploadKey);

        } catch (err) {
            console.error("Unable to upload file: ", err);
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
                        Make changes to your {label.toLowerCase()} here. <br/>Images must have the following formats: .jpeg or .gif or .png. <br/>Click save when you're done.
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