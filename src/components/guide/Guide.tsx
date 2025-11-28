"use client";

export default function Guide({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white absolute flex items-center justify-center top-[20%] cursor-pointer"
    >
      <div className="grid md:grid-cols-3 gap-6 max-w-lg">
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
  );
}
