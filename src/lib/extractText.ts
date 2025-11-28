import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function extractText(mimetype: string, buffer: Buffer) {
  if (mimetype === "application/pdf") {
    const data = await pdf(buffer);
    return data.text;
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimetype === "text/plain") {
    return buffer.toString("utf-8");
  }

  throw new Error(`지원하지 않는 파일 형식: ${mimetype}`);
}
