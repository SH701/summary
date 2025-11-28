import { FileText } from "lucide-react";
import InfoButton from "../button/InfoButton";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <FileText className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">문서 요약 AI</h1>
      <InfoButton />
      <p className="text-gray-600 text-lg">
        PDF, Word 문서를 업로드하면 AI가 핵심 내용을 요약해드립니다{" "}
      </p>
    </div>
  );
}
