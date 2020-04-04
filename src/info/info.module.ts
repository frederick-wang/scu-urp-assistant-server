import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InfoService } from './info.service'
import { InfoController } from './info.controller'
import { TrainingScheme, BachelorDegree, ScuUietp } from './info.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingScheme, BachelorDegree, ScuUietp])
  ],
  providers: [InfoService],
  controllers: [InfoController]
})
export class InfoModule {}
