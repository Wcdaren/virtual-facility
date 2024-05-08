import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { WorkflowsServiceModule } from './workflows-service.module'

async function bootstrap() {
	const app = await NestFactory.create(WorkflowsServiceModule)
	app.useGlobalPipes(new ValidationPipe())

	app.connectMicroservice<MicroserviceOptions>(
		{
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_URL],
				queue: 'workflows-service'
			}
		},
		{ inheritAppConfig: true }
	)
	await app.startAllMicroservices()
	await app.listen(3001)
	console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
