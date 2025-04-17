import React, { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom"; // Use useNavigate in v6
import axios from "axios";

const FileUploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate(); // Use useNavigate here

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
        toast({
          title: "File uploaded successfully",
          description: `${droppedFile.name} has been uploaded.`,
        });
        uploadFile(droppedFile);
      }
    },
    [toast]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        toast({
          title: "File uploaded successfully",
          description: `${selectedFile.name} has been uploaded.`,
        });
        uploadFile(selectedFile);
      }
    },
    [toast]
  );

  // Function to upload file and convert to chunks
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5221/api/document/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // After successful chunk conversion, redirect to chat
      if (response.status === 200) {
        navigate("/chat", { state: { documentChunks: response.data } }); // Use navigate here
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was an issue uploading the file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed p-12 text-center transition-all duration-300 
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary animate-border-pulse"
        }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileSelect}
        accept="*/*"
      />
      <div className="space-y-4">
        <Upload className="w-12 h-12 mx-auto text-primary animate-bounce" />
        <h3 className="text-lg font-medium">
          {file ? file.name : "Drop your file here"}
        </h3>
        <p className="text-sm text-gray-500">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "or click to browse from your computer"}
        </p>
      </div>
    </div>
  );
};

export default FileUploadZone;
