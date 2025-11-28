"use client";

import {
  FileText,
  Upload,
  Loader2,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { useState } from "react";

export default function DocumentSummarizer() {
  const [isDrag, setIsDrag] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            문서 요약 AI
          </h1>
          <p className="text-gray-600 text-lg">
            PDF, Word 문서를 업로드하면 AI가 핵심 내용을 요약해드립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 파일 업로드 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                문서 업로드
              </h2>
              {/* 드래그 앤 드롭 영역 */}
              <div
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
                />
              </div>
              {/* 업로드된 파일 정보 */}(
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-800">name</p>
                      <p className="text-sm text-gray-500">KB</p>
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              ){/* 에러 메시지 */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              {/* 요약 버튼 */}
              <button
                className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all ${
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
            </div>

            {/* 지원 파일 형식 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                지원하는 파일 형식
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>PDF 문서 (.pdf)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Microsoft Word (.docx, .doc)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 요약 결과 영역 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                요약 결과
              </h2>
              {summary && (
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
              )}
            </div>

            {!summary && !isLoading && (
              <div className="h-96 flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-20 h-20 mb-4" />
                <p className="text-lg">문서를 업로드하고 요약을 시작하세요</p>
              </div>
            )}

            {isLoading && (
              <div className="h-96 flex flex-col items-center justify-center">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">
                  문서를 분석하고 요약하는 중입니다...
                </p>
              </div>
            )}

            {summary && (
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {summary}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용 방법 안내 */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">사용 방법</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">1</div>
              <h4 className="font-semibold mb-2">문서 업로드</h4>
              <p className="text-blue-100">
                PDF 또는 Word 문서를 드래그하거나 클릭하여 업로드하세요
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2</div>
              <h4 className="font-semibold mb-2">AI 분석</h4>
              <p className="text-blue-100">
                요약 버튼을 클릭하면 AI가 문서를 분석합니다
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <h4 className="font-semibold mb-2">결과 확인</h4>
              <p className="text-blue-100">
                핵심 내용이 요약되어 표시되며 다운로드 가능합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
