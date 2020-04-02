import { Controller, Get, Param } from '@nestjs/common'
import { InfoService } from './info.service'

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('hello')
  getHello(): string {
    return this.infoService.getHello()
  }

  @Get('bachelor_degree')
  getAllBachelorDegrees() {
    return this.infoService.findAllBachelorDegrees()
  }

  @Get('bachelor_degree/:q')
  getBachelorDegree(@Param('q') q: string) {
    return this.infoService.findBachelorDegree(q)
  }
}
