import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { WorkflowsServiceModule } from './workflows-service.module'

async function bootstrap() {
	const app = await NestFactory.create(WorkflowsServiceModule)
	app.useGlobalPipes(new ValidationPipe())

	app.connectMicroservice<MicroserviceOptions>(
		{
			transport: Transport.NATS,
			options: {
				servers: process.env.NATS_URL
			}
		},
		{ inheritAppConfig: true }
	)
	await app.startAllMicroservices()
	await app.listen(3001)
	console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
