import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from "@nestjs/config"
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('LYA TEST REST API')
    .setDescription('API REST para prueba de LYA')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document)

  const configService = app.get(ConfigService)
  const { appPort, appPrefix, appHostServer } = configService.get('app')
  app.setGlobalPrefix(appPrefix)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(appPort || '4200')
  console.log(`Server running on ${appHostServer}/${appPrefix}`)
}

bootstrap()