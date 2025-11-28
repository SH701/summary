"use client";

import FileObject from "@/components/etc/FileObject";
import SummaryResult from "@/components/result/SummaryResult";
import SummaryButton from "@/components/ui/button/SummaryButton";
import Header from "@/components/ui/header/Header";
import Drag from "@/components/upload/Drag";
import FileInfo from "@/components/upload/FileInfo";
import { useState } from "react";

export default function DocumentSummarizer() {
  const [isDrag] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleReset = () => {
    setFile(null);
    setSummary("");
    setError("");
  };
  const handleSummarize = async () => {
    if (!file) {
      setError("파일이 없습니다");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/summarize", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        throw new Error("API 오류");
      }
      const data = await res.json();
      console.log(data);
      setSummary(data);
    } catch {
      setError("오류 발생");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 파일 업로드 영역 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                문서 업로드
              </h2>

              <Drag onSelectFile={(f) => setFile(f)} />

              {file && <FileInfo file={file} onReset={handleReset} />}
              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <SummaryButton
                isDrag={isDrag}
                isLoading={isLoading}
                onClick={handleSummarize}
              />
            </div>

            {/* 지원 파일 형식 */}
            <FileObject />
          </div>

          {/* 오른쪽: 요약 결과 영역 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                요약 결과
              </h2>
            </div>
            <SummaryResult summary={summary} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
