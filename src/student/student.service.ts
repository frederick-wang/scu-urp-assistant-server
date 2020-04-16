import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import TrainingScheme from './entities/TrainingScheme.entity'
import { Repository, Not, IsNull } from 'typeorm'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(TrainingScheme)
    private trainingSchemeRepo: Repository<TrainingScheme>
  ) {}

  onModuleInit() {
    console.log('onStudentModuleInit!')
  }

  async findAllTrainingSchemes() {
    return this.trainingSchemeRepo.find({
      select: ['majorId', 'grade', 'department', 'majorName'],
      where: [{ majorName: Not(IsNull()), department: Not(IsNull()) }]
    })
  }
}
