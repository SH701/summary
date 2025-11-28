import { POST } from "./route";

jest.mock("@/lib/extractText", () => ({
  extractText: jest.fn(async () => "문서 텍스트"),
}));

jest.mock("@/lib/summarize", () => ({
  Summaries: jest.fn(async () => ({
    summary: "요약 결과",
    tags: ["tag"],
    category: "test",
  })),
}));

describe("/api/summarize POST metod 테스트", () => {
  test("파일이 없을때 error를 return 해주는가?", async () => {
    const req = new Request("http://localhost/api/summarize", {
      method: "POST",
      body: new FormData(),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("파일이 없습니다.");
  });

  // data mocking
  test("파일이 있으면 요악을 넘겨주는가?", async () => {
    const form = new FormData();
    const mockFile = new File(["테스트내용"], "test.pdf", {
      type: "application/pdf",
    });
    form.append("file", mockFile);
    const req = new Request("http://localhost/api/summarize", {
      method: "POST",
      body: form,
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.summary).toBeDefined();
  });
});
