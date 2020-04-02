import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InfoService } from './info.service'
import { InfoController } from './info.controller'
import { BachelorDegree } from './info.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BachelorDegree])],
  providers: [InfoService],
  controllers: [InfoController]
})
export class InfoModule {}
