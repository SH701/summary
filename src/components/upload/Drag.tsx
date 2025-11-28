"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface DragProps {
  onSelectFile: (file: File | null) => void;
}

export default function Drag({ onSelectFile }: DragProps) {
  const [isDrag, setIsDrag] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File) => {
    const isValid =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword";

    if (!isValid) {
      setError("PDF 또는 Word 문서만 업로드 가능합니다.");
      return false;
    }

    setError("");
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (!validateFile(droppedFile)) return;

    onSelectFile(droppedFile);
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;

    if (!validateFile(selected)) return;

    onSelectFile(selected);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        onClick={() => inputRef.current?.click()}
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
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleSelectFile}
        />
      </div>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </>
  );
}
