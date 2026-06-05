import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { DocumentsModule } from './documents/documents.module'
import { SignaturesModule } from './signatures/signatures.module'
import { TemplatesModule } from './templates/templates.module'
import { NotificationsModule } from './notifications/notifications.module'
import { StorageModule } from './storage/storage.module'
import { EmailModule } from './email/email.module'
import { PdfModule } from './pdf/pdf.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    DocumentsModule,
    SignaturesModule,
    TemplatesModule,
    NotificationsModule,
    StorageModule,
    EmailModule,
    PdfModule,
  ],
})
export class AppModule {}
