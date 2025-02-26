import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FilePreviewProps {
  fileUrl: string;
  fileName: string;
  fileType: string;
}

const FilePreview = ({ fileUrl, fileName, fileType }: FilePreviewProps) => {
  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-primary-foreground/10 mb-2">
      {isImage ? (
        <Image
          src={fileUrl}
          alt={fileName}
          className="object-cover w-full h-64"
          height={720}
          width={1200}
        />
      ) : isVideo ? (
        <video
          src={fileUrl}
          controls
          className="object-cover w-full h-full"
        ></video>
      ) : (
        <div className="flex flex-col items-center justify-center p-2">
          <Link href={fileUrl}>
            <FileText className="w-10 h-10 " />
            <span className="text-sm ">
              {fileName.split(".").pop()?.toUpperCase()}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
