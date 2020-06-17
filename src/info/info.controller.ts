import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { InfoService } from './info.service'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRoleType } from 'src/user/user.interface'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/core/guards/roles.guard'
import { BachelorDegree } from './entities/BachelorDegree.entity'
import { ScuUietpInfo } from './info.interface'

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('bachelor_degree/:q')
  @Roles(UserRoleType.ADMIN, UserRoleType.NORMAL_USER)
  @UseGuards(AuthGuard(), RolesGuard)
  getBachelorDegree(@Param('q') q: string): Promise<BachelorDegree[]> {
    return this.infoService.findBachelorDegree(q)
  }

  @Get('scu_uietp/:q')
  @Roles(UserRoleType.ADMIN, UserRoleType.NORMAL_USER)
  @UseGuards(AuthGuard(), RolesGuard)
  getScuUiep(
    @Param('q') q: string
  ): Promise<{
    query: string
    number: number
    list: ScuUietpInfo[]
  }> {
    return this.infoService.findScuUietp(q)
  }
}
