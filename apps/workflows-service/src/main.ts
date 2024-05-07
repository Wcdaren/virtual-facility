import { NestFactory } from '@nestjs/core'
import { WorkflowsServiceModule } from './workflows-service.module'

async function bootstrap() {
	const app = await NestFactory.create(WorkflowsServiceModule)

	await app.startAllMicroservices()
	await app.listen(3001)
	console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
