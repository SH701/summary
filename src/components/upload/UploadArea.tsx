"use client";

import { Upload } from "lucide-react";

interface UploadAreaProps {
  isDrag: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onSelectFile: (file: File | null) => void;
}

export default function UploadArea({
  isDrag,
  onDragOver,
  onDragLeave,
  onDrop,
  onSelectFile,
}: UploadAreaProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
        isDrag
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      }`}
    >
      <Upload
        className={`w-16 h-16 mx-auto mb-4 ${
          isDrag ? "text-blue-500" : "text-gray-400"
        }`}
      />

      <p className="text-lg font-medium text-gray-700 mb-2">
        파일을 드래그하여 업로드하거나 클릭하세요
      </p>

      <p className="text-sm text-gray-500">
        PDF, DOCX, DOC 파일 지원 (최대 10MB)
      </p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
