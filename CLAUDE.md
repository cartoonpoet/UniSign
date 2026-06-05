# UniSign — AI 개발 컨텍스트

> **서비스명:** UniSign (구 SignFlow)  
> **서비스:** 전자서명 SaaS (B2B + B2C)  
> **GitHub:** https://github.com/cartoonpoet/UniSign  
> **UI 시안:** `/Users/junhoson/Documents/.superpowers/brainstorm/64970-1780665117/content/`

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript |
| UI 라이브러리 | `@lawkit/ui` (Vanilla Extract 기반) |
| 상태관리 | TanStack Query v5, Zustand v5 |
| 폼 | React Hook Form + Zod |
| Backend | NestJS 10, TypeScript |
| DB | PostgreSQL 16 + Prisma |
| 캐시/큐 | Redis + BullMQ |
| 파일 | AWS S3 / Cloudflare R2 |
| 이메일 | Resend |
| 결제 | Stripe |
| PDF 변환 | Gotenberg (Docker) |
| PDF 처리 | pdf-lib |
| 빌드 | Turborepo + pnpm |

## 앱 구조

```
apps/
├── web/    unisign.io         :3000  마케팅 랜딩 (Next.js)
├── app/    app.unisign.io     :3001  메인 앱 (Next.js)
├── sign/   sign.unisign.io    :3002  서명 전용 (Next.js)
├── admin/  admin.unisign.io   :3003  어드민 (Next.js)
└── api/    api.unisign.io     :4000  NestJS API

packages/
├── database/   @unisign/database — Prisma 스키마 + 클라이언트
├── shared/     @unisign/shared  — 공통 타입, 상수, 유틸
└── tsconfig/   @unisign/tsconfig
```

---

## @lawkit/ui 사용 규칙 (필수)

- **컴포넌트:** `Avatar`, `Button`, `Checkbox`, `Icon`, `Input`, `RadioGroup`, `Radio`, `Spinner`, `Switch`, `Tooltip`, `themeVars`
- **아이콘 사이즈:** `"sm"` = 16px / `"md"` = 24px (숫자 직접 지정 불가)
- **스타일링:** Vanilla Extract 필수 (`*.css.ts`) — CSS 모듈 사용 금지
- **색상:** `themeVars.*` 토큰 사용 — 하드코딩 금지
- **레퍼런스:** `node_modules/@lawkit/ui/CLAUDE.md` 또는 https://lds-storybook.vercel.app/

### 색상 토큰 매핑
| 디자인 색상 | lawkit 토큰 |
|---|---|
| `#2151ec` (Primary) | `themeVars.color.accentPrimary` |
| `#1739a5` (Primary Active) | `themeVars.color.accentPrimaryActive` |
| `#f6f7f9` (Background) | `themeVars.color.neutralBackground` |
| `#ffffff` (Surface) | `themeVars.color.neutralSurface` |
| `#e5e7eb` (Border) | `themeVars.color.neutralBorder` |
| `#0a0a0f` (Text Heading) | `themeVars.color.textHeading` |
| `#6b7280` (Text Muted) | `themeVars.color.textMuted` |
| `#16a34a` (Success) | `themeVars.color.accentSuccess` |
| `#dc2626` (Danger) | `themeVars.color.accentDanger` |
| `#d97706` (Warning) | `themeVars.color.accentWarning` |

---

## 코드 컨벤션

- **함수:** 화살표 함수 전용 (`const fn = () => {}`)
- **폴더:** PascalCase + `index.tsx` + barrel export
- **옵셔널:** `?` 자제 — 가능하면 명시적 타입
- **훅 규칙:** `useEffect` 최소화, `useMemo`/`useCallback` 금지
- **서버 컴포넌트:** Next.js App Router — 기본 서버 컴포넌트, 필요 시만 `'use client'`

---

## 디자인 시스템

### 글로벌 레이아웃 패턴

**메인 앱 (app.unisign.io)**
- 상단 글로벌 내비 (다크 `#111827`) — 사이드바 없음
- 인박스 탭 구조: 전체 / 내 서명 필요 / 발송됨 / 완료 / 초안
- 헤더 54px + `#f6f7f9` 배경 + 흰 카드

**로그인 (A 레이아웃)**
- 왼쪽 42%: 다크 브랜드 패널 (`#111827` + radial gradient)
- 오른쪽 58%: 흰 배경 폼
- 소셜 로그인(Google/카카오/네이버) 우선 → 이메일 폼

**회원가입 (C 레이아웃)**
- 다크 헤더 + 5단계 스텝 바
- 메인 폼 + 우측 컨텍스트 패널

**어드민 (admin.unisign.io)**
- 좌측 사이드바 (주황/빨간 그라디언트) — 일반 앱과 구분
- 별도 서브도메인, 슈퍼 어드민 전용

### 애니메이션
```css
fadeUp:    translateY(12px) → 0, opacity 0 → 1
fadeIn:    opacity 0 → 1
rowIn:     translateX(-6px) → 0, opacity 0 → 1
pulse:     opacity 펄스 (긴급 dot)
progFill:  width 0 → var(--w) (진행률 바)
shimmer:   background-position 슬라이드 (스켈레톤)
```

### 반응형
- 데스크탑: 1280px 기준
- 모바일: 375px (iPhone 15)
- 모바일 변경: 상단 내비 → 하단 탭 바, 서명 패널 → 하단 고정 sheet

---

## 화면 목록 (81개)

### 🔐 인증
| URL | 설명 | 앱 |
|---|---|---|
| `/login` | 브랜드 분할 레이아웃, 소셜 우선 | app |
| `/signup/terms` | 약관 동의 (전체/개별) | app |
| `/signup/info` | 기본정보 (실시간 유효성) | app |
| `/signup/verify` | 이메일 인증 (6자리 OTP + 타이머) | app |
| `/signup/org` | 조직 설정 | app |
| `/signup/plan` | 플랜 선택 (3카드) | app |
| `/signup/done` | 가입 완료 (컨페티) | app |
| `/invite/:token` | 초대 링크 가입 (3단계) | app |
| `/forgot-password` | 이메일 입력 | app |
| `/forgot-password/sent` | 발송 확인 + 재발송 타이머 | app |
| `/reset-password` | 새 비밀번호 (강도 바) | app |
| `/reset-password/done` | 재설정 완료 | app |

### 🏠 대시보드
| URL | 설명 | 앱 |
|---|---|---|
| `/dashboard` | 서명 인박스 (탭 기반, 사이드바 없음) | app |
| `/dashboard` (empty) | 첫 방문 빈 상태 | app |

### ✍️ 전자서명 플로우 (순서 확정)
| URL | 설명 | 앱 |
|---|---|---|
| `/new` | 문서 업로드 (멀티파일 + 병합) | app |
| `/new/signers` | 서명자 설정 (순차/병렬/혼합) | app |
| `/new/fields` | 서명 필드 배치 (PDF 에디터) | app |
| `/new/send` | 발송 확인 (이메일 미리보기) | app |
| `/sign/:token` | 서명 화면 (회원) | sign |
| `/sign/:token/done` | 서명 완료 | sign |
| `/sign/:token` (guest) | 비회원 본인확인 → OTP → 서명 | sign |
| `/documents/:id/status` | 다수 서명자 진행 현황 | app |
| `/documents/:id/rejected` | 서명 거절 처리 | app |
| `/sign/:token/delegate` | 대리 서명 위임 | sign |

### 📄 문서 관리
| URL | 설명 | 앱 |
|---|---|---|
| `/documents` | 목록 (인박스 탭 + 호버 액션) | app |
| `/documents/:id` | 상세 (PDF 뷰어 + 패널) | app |
| `/documents/:id/audit` | 감사 추적 (타임라인) | app |
| `/documents?q=` | 검색 + 고급 필터 | app |

### 📋 템플릿
| URL | 설명 | 앱 |
|---|---|---|
| `/templates` | 목록 (카드 그리드 + 카테고리) | app |
| `/templates/:id` | 상세 (PDF 미리보기) | app |
| `/templates/:id/use` | 발송 (서명자 정보 입력만) | app |
| `/templates/:id/edit` | 생성/편집 (필드 배치) | app |

### 👤 마이페이지
| URL | 설명 | 앱 |
|---|---|---|
| `/settings/profile` | 프로필 | app |
| `/settings/security` | 보안 (2FA, 기기) | app |
| `/settings/notifications` | 알림 토글 | app |
| `/settings/billing` | 구독/요금제 | app |
| `/settings/usage` | 사용 내역 + 차트 | app |
| `/settings/delete` | 회원탈퇴 | app |

### 🏢 조직/팀
| URL | 설명 | 앱 |
|---|---|---|
| `/org` | 내 조직 전체 (멀티 조직 스위처) | app |
| `/org/members` | 멤버 관리 + 초대 | app |
| `/org/roles` | 권한/역할 (커스텀 역할 생성) | app |
| `/org/settings` | 조직 설정 | app |
| `/org/upgrade` | 플랜 업그레이드 | app |

### 🛡️ 어드민
| URL | 설명 | 앱 |
|---|---|---|
| `/dashboard` | KPI + 차트 + 가입자 | admin |
| `/users` | 사용자 관리 + 상세 패널 | admin |
| `/billing` | MRR/ARR + 결제내역 | admin |
| `/system` | 서비스 상태 + 리소스 + 에러로그 | admin |

### ⚠️ 엣지 케이스
- 404, 서비스 점검 중, 서명 링크 만료, 403 접근 거부
- 빈 검색 결과, 로딩 스켈레톤, 이미 서명 완료

### 🌐 마케팅
| URL | 설명 | 앱 |
|---|---|---|
| `/` | 랜딩 페이지 (히어로/기능/요금제/후기) | web |

---

## 핵심 UX 결정사항

### 전자서명 플로우 순서 (변경 불가)
1. 문서 업로드
2. 서명자 설정 ← 순서 변경됨 (필드 배치 전)
3. 서명 필드 배치
4. 발송 확인

### 비회원 서명
- 이메일 입력 본인확인 → OTP → 서명 완료
- 서명 후 가입 유도 넛지 (강요 아닌 자연스러운 CTA)
- `sign.unisign.io` 에서 처리

### 대시보드
- **인박스 모델**: 사이드바 없음, 상단 탭 기반
- **문서 행**: PDF 썸네일 | 서명자 아바타(완료=체크뱃지) | 진행률 바 | 기한 | 상태 칩 | 호버 액션

### 조직
- 상단 조직 스위처 드롭다운으로 전환/생성
- 커스텀 역할: 체크박스 8개 권한 구성

---

## 개발 시작 순서 (권장)

1. **auth 모듈** — NestJS: 회원가입/로그인/JWT/소셜 OAuth
2. **users + organizations 모듈** — DB CRUD
3. **app/login, app/signup** — Next.js 인증 UI
4. **documents 모듈** — NestJS: 문서 CRUD + 파일 업로드
5. **app/new (서명 요청 플로우)** — 4단계 위저드
6. **sign app (서명 화면)** — 비회원 포함
7. **app/dashboard** — 인박스
8. **나머지 순서로 진행**

---

## 로컬 개발

```bash
# DB, Redis, Gotenberg, 메일 서버 시작
docker compose up -d

# 의존성
pnpm install

# DB 마이그레이션
pnpm --filter @unisign/database db:migrate
pnpm --filter @unisign/database db:generate

# 개발 서버 (전체)
pnpm dev
```

| 서비스 | URL |
|---|---|
| 랜딩 | http://localhost:3000 |
| 앱 | http://localhost:3001 |
| 서명 | http://localhost:3002 |
| 어드민 | http://localhost:3003 |
| API | http://localhost:4000/api |
| Swagger | http://localhost:4000/api/docs |
| 이메일 (Mailpit) | http://localhost:8025 |
