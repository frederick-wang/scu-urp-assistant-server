import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TrainingScheme } from './entities/TrainingScheme.entity'
import { Repository, Not, IsNull } from 'typeorm'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(TrainingScheme)
    private trainingSchemeRepo: Repository<TrainingScheme>
  ) {}

  onModuleInit(): void {
    console.log('onStudentModuleInit!')
  }

  async findAllTrainingSchemes(): Promise<TrainingScheme[]> {
    return this.trainingSchemeRepo.find({
      select: ['majorId', 'grade', 'department', 'majorName'],
      where: [{ majorName: Not(IsNull()), department: Not(IsNull()) }]
    })
  }
}
