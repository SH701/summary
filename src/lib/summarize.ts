import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function Summaries(text: string | null) {
  if (!text) return;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `문서를 요약해줘. 아래 JSON 구조에 맞춰서만 응답해.
{
  "summary": "string",
  "tags": ["string"],
  "category": "string"
}`,
        },
        { role: "user", content: text },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("AI 응답이 비어 있습니다.");
    }
    const result = JSON.parse(content);
    return result.summary;
  } catch (err) {
    console.log(err);
    throw new Error("요약 할 수 없는 글입니다.");
  }
}
