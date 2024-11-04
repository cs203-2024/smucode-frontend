"use client"

import { useState } from 'react';

const ImageUploader: React.FC = () => {
  // Define the state with type File or null
  const [file, setFile] = useState<File | null>(null);

  // Handler for file input change with proper event typing
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  // Function to upload the file
  const uploadFile = async (): Promise<void> => {
    if (!file) {
      alert('No file selected.');
      return;
    }

    try {
      // Get pre-signed URL from the API
      const response = await fetch(
        `/api/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`
      );

      if (!response.ok) {
        throw new Error('Failed to get upload URL.');
      }

      // Define the expected response shape
      interface UploadUrlResponse {
        uploadUrl: string;
      }

      const data: UploadUrlResponse = await response.json();

      // Upload the file directly to S3 using the pre-signed URL
      const uploadResponse = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (uploadResponse.ok) {
        alert('Upload successful!');
        setFile(null); // Optionally reset the file input
      } else {
        throw new Error('Upload failed.');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={!file}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
