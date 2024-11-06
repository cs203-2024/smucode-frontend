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

interface ImageUploaderProps {
    
}

export default function ImageUploader({ onUploadSuccess }) {
    const [file, setFile] = useState<File>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(null);
    };

    const uploadFile = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);

        try {
        // Step 1: Get pre-signed URL and image key from backend
            const response = await fetch(`/api/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
            
            if (!response.ok) {
                throw new Error('Failed to get upload URL');
            }

            const { uploadUrl, imageKey } = await response.json();

            // Step 2: Upload the file to S3 using the pre-signed URL
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                'Content-Type': file.type,
                },
                body: file,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload file to S3');
            }

            // Step 3: Notify backend to store the image reference
            const storeResponse = await fetch(`/api/user-profile`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageKey }),
            });

            if (!storeResponse.ok) {
                throw new Error('Failed to store image reference');
            }

            // Step 4: Optionally retrieve the updated profile or image URL
            const profileResponse = await fetch(`/api/user-profile`);
            const profileData = await profileResponse.json();
            onUploadSuccess(profileData.profileImageUrl);

            alert('Upload successful!');
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={uploadFile} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Name
                        </Label>
                        <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Username
                        </Label>
                        <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}