import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BachelorDegree, ScuUietp } from './info.entity'
import { Repository, Like } from 'typeorm'
import { formatScuUietp } from './utils'
import { ScuUietpInfo } from './info.interface'

@Injectable()
export class InfoService implements OnModuleInit {
  constructor(
    @InjectRepository(BachelorDegree)
    private bachelorDegreeRepo: Repository<BachelorDegree>,
    @InjectRepository(ScuUietp)
    private scuUiepRepo: Repository<ScuUietp>
  ) {}

  onModuleInit(): void {
    console.log('onInfoModuleInit!')
  }

  findBachelorDegree(q: string): Promise<BachelorDegree[]> {
    q = q.replace(/%/g, '\\%').trim()
    return this.bachelorDegreeRepo.find({
      where: [{ majorName: Like(`%${q}%`) }, { majorCode: Like(`%${q}%`) }],
      select: ['majorCode', 'majorName', 'category', 'approvalNumber', 'remark']
    })
  }

  async findScuUietp(
    q: string
  ): Promise<{
    query: string
    number: number
    list: ScuUietpInfo[]
  }> {
    q = q.replace(/%/g, '\\%').trim()
    const result = await this.scuUiepRepo.find({
      where: [
        { projectName: Like(`%${q}%`) },
        { schoolSupervisorName: Like(`%${q}%`) },
        { projectLeaderName: Like(`%${q}%`) },
        { projectLeaderCode: Like(`%${q}%`) },
        { otherMemberInformation: Like(`%${q}%`) }
      ],
      select: [
        'projectYear',
        'collegeName',
        'projectName',
        'projectLeaderName',
        'participantNumber',
        'otherMemberInformation',
        'schoolSupervisorName',
        'projectLevel',
        'applicationCategory',
        'projectCategory'
      ]
    })
    return {
      query: q,
      number: result.length,
      list: formatScuUietp(result)
    }
  }
}
