import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.use(helmet())
  app.use(compression())

  app.enableCors({
    origin: config.get('ALLOWED_ORIGINS', 'http://localhost:3001').split(','),
    credentials: true,
  })

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  )

  if (config.get('NODE_ENV') !== 'production') {
    const doc = new DocumentBuilder()
      .setTitle('UniSign API')
      .setDescription('전자서명 플랫폼 API 문서')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, doc))
  }

  const port = config.get<number>('PORT', 4000)
  await app.listen(port)
  console.log(`🚀 UniSign API  →  http://localhost:${port}/api`)
  console.log(`📖 Swagger      →  http://localhost:${port}/api/docs`)
}

bootstrap()
