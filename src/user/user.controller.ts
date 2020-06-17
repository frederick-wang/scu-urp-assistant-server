import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { Roles } from '../common/decorators/roles.decorator'
import { Result } from '../common/interfaces/result.interface'
import { AuthService } from '../core/auth/auth.service'
import { RolesGuard } from '../core/guards/roles.guard'
import { UserService } from './user.service'
import { JWTData, ActiveUser } from './user.interface'
import { Usr } from './user.decorator'
import { UserRoleType } from './entities/User.entity'

type LoginDTO = JWTData

@Controller('user')
export class UserController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  /**
   * 用户登录成功后，返回的 data 是授权令牌；
   * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
   * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
   */
  @Post('login')
  async login(
    @Body()
    body: LoginDTO
  ): Promise<Result> {
    const { id, client } = await this.userService.login(body.id, body.client)
    const accessToken = await this.authService.createToken({ id, client })
    return {
      data: {
        accessToken
      }
    }
  }

  @Get('info')
  @Roles(UserRoleType.ADMIN, UserRoleType.NORMAL_USER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getInfo(@Usr() user: ActiveUser): Promise<Result> {
    return {
      data: { ...user }
    }
  }
}
