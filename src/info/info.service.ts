import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BachelorDegree, TrainingScheme, ScuUietp } from './info.entity'
import { Repository, Like } from 'typeorm'

@Injectable()
export class InfoService implements OnModuleInit {
  constructor(
    @InjectRepository(BachelorDegree)
    private bachelorDegreeRepo: Repository<BachelorDegree>,
    @InjectRepository(TrainingScheme)
    private trainingSchemeRepo: Repository<TrainingScheme>,
    @InjectRepository(ScuUietp)
    private scuUiepRepo: Repository<ScuUietp>
  ) {}

  onModuleInit() {
    console.log('onInfoModuleInit!')
  }

  findAllBachelorDegrees(): Promise<BachelorDegree[]> {
    console.log('123')
    return this.bachelorDegreeRepo.find()
  }

  findBachelorDegree(q: string): Promise<BachelorDegree[]> {
    q = q.replace(/%/g, '').trim()
    return this.bachelorDegreeRepo.find({
      where: [{ majorName: Like(`%${q}%`) }, { majorCode: Like(`%${q}%`) }],
      select: ['majorCode', 'majorName', 'category', 'approvalNumber', 'remark']
    })
  }
}
