export default function FileObject() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-3">지원하는 파일 형식</h3>
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
  );
}
