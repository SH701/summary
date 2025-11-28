📘 AI Document Summary Lab

간단한 PDF → 텍스트 추출 → AI 요약 기능을 실험하기 위한 사이드 프로젝트입니다.
텍스트가 포함된 PDF는 자동으로 요약되며, 스캔본처럼 텍스트가 없는 PDF는 “추출 불가” 메시지를 반환합니다.

🚀 기능
1. PDF 업로드

사용자가 PDF 파일을 업로드하면 서버로 전송합니다.

2. 텍스트 추출

pdf-parse 라이브러리를 사용해 문서 내부의 텍스트를 추출합니다.

3. AI 요약

OpenAI API(gpt-4o-mini)를 사용하여 3–5문장 한국어 요약을 생성합니다.

4. 추출 불가 처리

스캔본·보호된 문서처럼 텍스트가 없는 PDF는 자동으로 안내 문구를 반환합니다.

🔧 사용 방법
1) 저장소 클론
git clone https://github.com/yourname/summary
cd summary

2) 환경 변수 설정

.env파일 생성:

OPENAI_API_KEY=sk-xxxx...

3) 패키지 설치
pnpm install

4) 실행
pnpm dev


이 프로젝트는 실험용 사이드 프로젝트이며 다음 기능은 포함되지 않습니다.

OCR 기반 이미지 → 텍스트 변환

긴 문서 chunking 요약

태그/카테고리 자동 분류