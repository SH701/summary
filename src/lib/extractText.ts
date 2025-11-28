/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import mammoth from "mammoth";

export async function extractText(
  mimetype: string,
  buffer: Buffer
): Promise<string> {
  if (mimetype === "application/pdf") {
    const PDFParser = require("pdf2json");

    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        reject(new Error(errData.parserError || "PDF 파싱 실패"));
      });

      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        try {
          let fullText = "";

          if (pdfData.Pages) {
            pdfData.Pages.forEach((page: any) => {
              if (page.Texts) {
                page.Texts.forEach((text: any) => {
                  if (text.R) {
                    text.R.forEach((r: any) => {
                      if (r.T) {
                        fullText += decodeURIComponent(r.T) + " ";
                      }
                    });
                  }
                });
                fullText += "\n";
              }
            });
          }

          resolve(fullText.trim() || "텍스트를 추출할 수 없습니다.");
        } catch (err) {
          reject(err);
        }
      });

      pdfParser.parseBuffer(buffer);
    });
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
