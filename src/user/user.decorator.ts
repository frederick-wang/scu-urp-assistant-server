import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ActiveUser } from './user.interface'

export const Usr = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user as ActiveUser
  }
)
