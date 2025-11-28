import { extractText } from "@/lib/extractText";
import { Summaries } from "@/lib/summarize";
import {
  SummarySuccessResponse,
  SummaryFailureResponse,
} from "@/types/summary";

const MIN_TEXT_LENGTH = 100;

const MAX_CHARS = 8000;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      const res: SummaryFailureResponse = {
        success: false,
        extractable: false,
        reason: "UNKNOWN",
        message: "파일이 없습니다.",
      };

      return Response.json(res, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const text = await extractText(file.type, buffer);

    if (!text || text.trim().length < MIN_TEXT_LENGTH) {
      const res: SummaryFailureResponse = {
        success: false,
        extractable: false,
        reason: "NO_TEXT",
        message:
          "이 PDF에서는 텍스트를 추출할 수 없습니다. (스캔본이거나 보호된 문서일 수 있습니다.)",
      };

      return Response.json(res, { status: 200 });
    }

    const safeText = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;

    const rawResult = await Summaries(safeText);

    const res: SummarySuccessResponse = {
      success: true,
      extractable: true,
      summary: rawResult.summary,
      tags: rawResult.tags,
      category: rawResult.category,
    };

    return Response.json(res, { status: 200 });
  } catch {
    const res: SummaryFailureResponse = {
      success: false,
      extractable: false,
      reason: "UNKNOWN",
      message: "요약에 실패했습니다.",
    };

    return Response.json(res, { status: 500 });
  }
}
