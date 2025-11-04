"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../libs/supabse/client";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const bucket = "public-uploads";

  // Preview image before uploading
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please select a valid image file (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // Generate unique name
  const generateFileName = (file: File) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    return `${timestamp}_${randomString}.${extension}`;
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    
    try {
      setUploading(true);

      const fileName = generateFileName(file);
      const filePath = fileName; // Upload to root, not 'images/' folder

      console.log("Starting upload...", { fileName, filePath });

      // Get current session to ensure user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw new Error("Authentication required. Please sign in again.");
      }

      if (!session) {
        throw new Error("You must be logged in to upload files.");
      }

      console.log("User authenticated:", session.user.id);

      // Upload file directly to bucket root
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error("Upload error details:", error);
        
        // Handle specific error cases
        if (error.message.includes('row-level security policy')) {
          throw new Error("Upload permission denied. Please check your Supabase Storage policies.");
        } else if (error.message.includes('already exists')) {
          throw new Error("File with this name already exists. Please try again.");
        } else {
          throw error;
        }
      }

      console.log("Upload successful:", data);

      // Get public URL
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      console.log("Public URL:", publicData.publicUrl);
      
      setImageUrl(publicData.publicUrl);
      setPreviewUrl(""); // remove local preview after upload
      setFile(null);
      
      alert("Upload successful! The image is now available in your gallery.");

    } catch (error: any) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageUrl) return alert("No image to delete.");

    try {
      // Extract file name from URL more reliably
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (!fileName) throw new Error("Could not extract file name from URL");

      console.log("Attempting to delete:", fileName);

      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) throw error;

      console.log("Delete successful:", data);
      alert("Image deleted successfully!");
      setImageUrl("");
      
    } catch (error: any) {
      console.error("Delete failed:", error);
      alert("Delete failed: " + error.message);
    }
  };

  // Cleanup preview URL from memory
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upload New Photo
        </h3>

        {/* File input */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all mb-4"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-28 w-full object-cover rounded-md"
            />
          ) : (
            <>
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-500 text-sm text-center px-4">
                Click to select an image
              </p>
              <p className="text-gray-400 text-xs mt-1">
                JPG, PNG, GIF, WEBP (max 5MB)
              </p>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* File info */}
        {file && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Selected: <span className="font-normal">{file.name}</span>
            </p>
            <p className="text-xs text-gray-500">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-white transition-all ${
              uploading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-sm"
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </span>
            ) : (
              "Upload Image"
            )}
          </button>

          {imageUrl && (
            <button
              onClick={handleDelete}
              disabled={uploading}
              className="px-4 py-2.5 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-all shadow-sm disabled:bg-gray-400"
            >
              Delete
            </button>
          )}
        </div>

      </div>
    </div>
  );
}