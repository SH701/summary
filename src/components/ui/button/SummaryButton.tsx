import { Loader2 } from "lucide-react";

interface ButtonProps {
  onClick: () => void;
  isDrag: boolean;
  isLoading: boolean;
}

export default function SummaryButton({
  isDrag,
  isLoading,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all cursor-pointer ${
        isDrag
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          요약 중...
        </span>
      ) : (
        "문서 요약하기"
      )}
    </button>
  );
}
