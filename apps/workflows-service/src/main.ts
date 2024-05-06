import { NestFactory } from '@nestjs/core'
import { WorkflowsServiceModule } from './workflows-service.module'

async function bootstrap() {
	const app = await NestFactory.create(WorkflowsServiceModule, { cors: true })

	app.setGlobalPrefix('api')
	await app.listen(process.env.PORT || 5001)
	console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
