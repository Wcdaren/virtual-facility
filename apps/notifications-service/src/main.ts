import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NotificationsServiceModule } from './notifications-service.module'

async function bootstrap() {
	const app = await NestFactory.create(NotificationsServiceModule)
  app.useGlobalPipes(new ValidationPipe())

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'workflows-service'
      }
    },
    { inheritAppConfig: true }
  )
  await app.startAllMicroservices()
	await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
