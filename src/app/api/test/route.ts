import { prisma } from "@/lib/prisma";

export async function GET() {
  const doc = await prisma.document.create({
    data: {
      filename: "test.txt",
      mimetype: "text/plain",
      size: 10,
      content: "Hello world",
      tags: ["test", "example"], // Json 타입이라 배열로 바로 저장됨!
      summary: "요약 테스트",
      title: "테스트 문서",
    },
  });

  return Response.json(doc);
}
