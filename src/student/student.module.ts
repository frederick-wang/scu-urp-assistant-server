import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { StudentController } from './student.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrainingScheme } from './entities/TrainingScheme.entity'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([TrainingScheme])
  ],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
