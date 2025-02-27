"use client";
import React, { useState, useRef } from "react";
import { FileVideo, FileText, File, ImageIcon, X, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface FileUploadProps {
  onSubmit: (file: File | null) => void;
  multiple?: boolean;
  accept?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onSubmit,
  multiple = false,
  accept,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;

    if (!files.length) {
      return;
    }

    if (!multiple && files.length > 1) {
      setError("Only one file is allowed");
      return;
    }

    const acceptedTypes = accept ? accept.split(",") : [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isValidFileType = acceptedTypes.some((type) => {
        const regex = new RegExp(type.replace("*", ".*"));
        return regex.test(file.type);
      });

      if (accept && !isValidFileType) {
        setError(`Invalid file type: ${file.name}`);
        return;
      }
    }

    setError(null);
    setSelectedFile(files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const fileURL = URL.createObjectURL(selectedFile);

    // Check for image
    if (selectedFile.type.startsWith("image/")) {
      return (
        <div className="relative w-60 h-auto mt-4">
          <Image
            height={480}
            width={720}
            src={fileURL}
            alt={selectedFile.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    // Check for video
    if (selectedFile.type.startsWith("video/")) {
      return (
        <div className="relative w-60 h-auto mt-4">
          <video
            src={fileURL}
            controls
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    // For other file types, show an icon and name
    let IconComponent = File;
    if (selectedFile.type.includes("pdf")) IconComponent = FileText;
    if (selectedFile.type.includes("word")) IconComponent = FileText;
    if (selectedFile.type.includes("video")) IconComponent = FileVideo;
    if (selectedFile.type.includes("image")) IconComponent = ImageIcon;

    return (
      <div className="flex items-center gap-2 my-4">
        <IconComponent className="w-6 h-6 text-primary" />
        <span className="text-base-content">{selectedFile.name}</span>
        <Button
          onClick={removeFile}
          className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`${className} border-2 border-dashed p-10 rounded-lg text-center cursor-pointer transition-colors mb-4 ${
          dragActive ? "border-primary" : "border-base-50 bg-base-200"
        }`}
        onClick={triggerFileSelect}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
        <p className="text-base-content/50">
          {multiple
            ? "Drag & Drop files here or click to upload multiple files"
            : "Drag & Drop a file here or click to upload"}
        </p>
      </div>
      {error && <p className="text-xs text-error mt-2">{error}</p>}

      {/* Render the selected file preview */}
      <div className="flex items-center gap-2">
        {renderFilePreview()}
        {selectedFile && (
          <Button onClick={handleSubmit} variant={"outline"}>
            <Check/>
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default FileUpload;
