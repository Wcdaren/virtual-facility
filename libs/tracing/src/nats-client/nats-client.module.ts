import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NatsClientProxy } from './nats-client.proxy'
import { NATS_BROKER } from './constants'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: NATS_BROKER,
				transport: Transport.NATS,
				options: {
					servers: process.env.NATS_URL
				}
			}
		])
	],
	providers: [NatsClientProxy],
	exports: [NatsClientProxy]
})
export class NatsClientModule {}
