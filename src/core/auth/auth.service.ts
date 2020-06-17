import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { JWTData, ActiveUser } from '../../user/user.interface'
import { UserService } from '../../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  async createToken(payload: JWTData): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async validateUser({ id, client }: JWTData): Promise<ActiveUser> {
    const user = await this.userService.findOneById(id)
    return { client, ...user }
  }
}
