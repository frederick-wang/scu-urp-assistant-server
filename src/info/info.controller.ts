import { Controller, Get, Param } from '@nestjs/common'
import { InfoService } from './info.service'

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('bachelor_degree/:q')
  getBachelorDegree(@Param('q') q: string) {
    return this.infoService.findBachelorDegree(q)
  }

  @Get('scu_uietp/:q')
  getScuUiep(@Param('q') q: string) {
    return this.infoService.findScuUietp(q)
  }
}
