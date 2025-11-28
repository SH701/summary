import { extractText } from "@/lib/extractText";
import { Summaries } from "@/lib/summarize";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return Response.json({ error: "파일이 없습니다." }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await extractText(file.type, buffer);
    const clean = text
      .replace(/페이지 구분이 있습니다\./g, "")
      .replace(/\s+/g, " ")
      .trim();

    const result = await Summaries(clean);

    console.log("result :", result);
    return Response.json(result);
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        error: "요약에 실패했습니다",
      },
      { status: 403 }
    );
  }
}
