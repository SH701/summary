import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import type { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractText(
  mimetype: string,
  buffer: Buffer
): Promise<string> {
  // PDF
  if (mimetype === "application/pdf") {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content: TextContent = await page.getTextContent();

      const pageText = content.items
        .map((item) => (item as TextItem).str)
        .join(" ");

      text += pageText + "\n";
    }

    return text.trim();
  }

  // DOCX
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // TXT
  if (mimetype === "text/plain") {
    return buffer.toString("utf-8");
  }

  throw new Error(`지원하지 않는 파일 형식: ${mimetype}`);
}
