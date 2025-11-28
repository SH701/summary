import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type RawSummaryResult = {
  summary: string;
  tags: string[];
  category: string;
};

type ModelResponseShape = {
  summary: string;
  tags: string[];
  category: string;
};

export async function Summaries(text: string): Promise<RawSummaryResult> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "당신은 긴 한국어/영어 문서를 요약하고 태그와 카테고리를 생성하는 도우미입니다. 반드시 JSON 형식으로만 응답하세요.",
        },
        {
          role: "user",
          content: [
            "다음 문서를 읽고 아래 형식의 JSON으로만 답변하세요.",
            "",
            "요구 형식:",
            "{",
            '  "summary": "문서 요약 (한국어, 3~5문장)",',
            '  "tags": ["짧은 키워드 태그", "2~5개"],',
            '  "category": "문서의 주제를 한 단어 또는 짧은 구절로 요약 (예: 기술, 논문, 비즈니스, 정책, 교육 등)"',
            "}",
            "",
            "문서:",
            "-----",
            text,
            "-----",
          ].join("\n"),
        },
      ],
      temperature: 0.3,
      max_tokens: 512,
    });

    const message = completion.choices[0]?.message;

    if (!message || !message.content) {
      throw new Error("No content from OpenAI");
    }

    const parsed = JSON.parse(message.content) as Partial<ModelResponseShape>;

    const summary =
      typeof parsed.summary === "string" && parsed.summary.trim().length > 0
        ? parsed.summary.trim()
        : "요약을 생성하지 못했습니다.";

    const tags =
      Array.isArray(parsed.tags) && parsed.tags.length > 0
        ? parsed.tags
            .filter((tag) => typeof tag === "string")
            .map((t) => t.trim())
            .filter(Boolean)
        : ["요약 실패"];

    const category =
      typeof parsed.category === "string" && parsed.category.trim().length > 0
        ? parsed.category.trim()
        : "기타";

    return {
      summary,
      tags,
      category,
    };
  } catch (error) {
    console.error("Summaries error:", error);

    return {
      summary: "요약 생성 중 오류가 발생했습니다.",
      tags: ["요약 오류"],
      category: "기술",
    };
  }
}
