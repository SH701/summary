import { CheckCircle, XCircle } from "lucide-react";

interface FileInfoProps {
  file: File;
  onReset: () => void;
}

export default function FileInfo({ file, onReset }: FileInfoProps) {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 cursor-pointer" />
          <div>
            <p className="font-medium text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
