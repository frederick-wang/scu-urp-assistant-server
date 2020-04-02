import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BachelorDegree } from './info.entity'
import { Repository, Like } from 'typeorm'

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(BachelorDegree)
    private bachelorDegreeRepo: Repository<BachelorDegree>
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  findAllBachelorDegrees(): Promise<BachelorDegree[]> {
    return this.bachelorDegreeRepo.find()
  }

  findBachelorDegree(q: string): Promise<BachelorDegree[]> {
    return this.bachelorDegreeRepo.find({
      where: [
        { majorName: Like(`%${q}%`) },
        { majorCode: Like(`%${q}%`) },
        { category: Like(`%${q}%`) },
        { remark: Like(`%${q}%`) }
      ]
    })
  }
}
