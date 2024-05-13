import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InboxService } from './inbox.service'
import { Inbox } from './entities/inbox.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Inbox])],
	providers: [InboxService],
	exports: [TypeOrmModule, InboxService]
})
export class InboxModule {}
