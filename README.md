# UniSign — 전자서명 플랫폼

> 계약서, 이제 UniSign 하나로 끝내세요

## 기술 스택

| 영역 | 기술 |
|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript |
| **UI** | @lawkit/ui, Vanilla Extract |
| **상태관리** | TanStack Query, Zustand |
| **폼** | React Hook Form + Zod |
| **Backend** | NestJS 10, TypeScript |
| **DB** | PostgreSQL 16 + Prisma |
| **캐시/큐** | Redis + BullMQ |
| **파일** | AWS S3 / Cloudflare R2 |
| **이메일** | Resend |
| **결제** | Stripe |
| **PDF 변환** | Gotenberg |
| **PDF 처리** | pdf-lib |
| **빌드** | Turborepo + pnpm |

## 앱 구조

```
apps/
├── web/    unisign.io         :3000  마케팅 랜딩
├── app/    app.unisign.io     :3001  메인 앱
├── sign/   sign.unisign.io    :3002  서명 전용
├── admin/  admin.unisign.io   :3003  어드민
└── api/    api.unisign.io     :4000  NestJS API

packages/
├── database/   Prisma 스키마 + 클라이언트
├── shared/     공통 타입, 상수, 유틸
└── tsconfig/   TypeScript 설정
```

## 시작하기

```bash
# 1. 의존성 설치
pnpm install

# 2. 로컬 서비스 (DB, Redis, Gotenberg, 메일)
docker compose up -d

# 3. 환경 변수
cp apps/api/.env.example apps/api/.env

# 4. DB 마이그레이션
pnpm --filter @unisign/database db:migrate
pnpm --filter @unisign/database db:generate

# 5. 개발 서버 전체 실행
pnpm dev
```

## 로컬 URL

| | URL |
|---|---|
| 랜딩 | http://localhost:3000 |
| 앱 | http://localhost:3001 |
| 서명 | http://localhost:3002 |
| 어드민 | http://localhost:3003 |
| API | http://localhost:4000/api |
| Swagger | http://localhost:4000/api/docs |
| 이메일 | http://localhost:8025 |
