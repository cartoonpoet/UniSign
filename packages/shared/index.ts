// UniSign 공통 타입 & 유틸

export type PlanType = 'STARTER' | 'PRO' | 'ENTERPRISE'

export const PLAN_LIMITS: Record<PlanType, { documents: number; members: number; storageGB: number }> = {
  STARTER:    { documents: 10,       members: 1,          storageGB: 1   },
  PRO:        { documents: 100,      members: 5,          storageGB: 5   },
  ENTERPRISE: { documents: Infinity, members: Infinity,   storageGB: 100 },
}

export type DocumentStatus =
  | 'DRAFT' | 'SENT' | 'PARTIALLY_SIGNED'
  | 'COMPLETED' | 'CANCELLED' | 'EXPIRED' | 'DECLINED'

export type SigningMode = 'SEQUENTIAL' | 'PARALLEL' | 'MIXED'
export type SignerStatus = 'PENDING' | 'VIEWED' | 'SIGNING' | 'SIGNED' | 'DECLINED' | 'DELEGATED'
export type FieldType = 'SIGNATURE' | 'INITIAL' | 'DATE' | 'TEXT' | 'CHECKBOX' | 'STAMP'

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DOCUMENT_EXPIRED: 'DOCUMENT_EXPIRED',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  PLAN_LIMIT_EXCEEDED: 'PLAN_LIMIT_EXCEEDED',
} as const

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const generateSignUrl = (baseUrl: string, token: string): string =>
  `${baseUrl}/sign/${token}`
