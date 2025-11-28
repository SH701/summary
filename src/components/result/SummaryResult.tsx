import { FileText, Loader2, Download } from "lucide-react";

interface SummaryProps {
  summary: string;
  isLoading: boolean;
}

export default function SummaryResult({ summary, isLoading }: SummaryProps) {
  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">문서를 분석하고 요약하는 중입니다...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-400">
        <FileText className="w-20 h-20 mb-4" />
        <p className="text-lg">문서를 업로드하고 요약을 시작하세요</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">요약 결과</h2>

        <button
          onClick={() => {
            const blob = new Blob([summary], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "요약본.txt";
            a.click();
          }}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Download className="w-4 h-4" />
          <span>다운로드</span>
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
        {summary}
      </div>
    </>
  );
}
