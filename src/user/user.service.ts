import { Injectable } from '@nestjs/common'
import { User, ClientType, UserRoleType, UserPO } from './user.interface'

@Injectable()
export class UserService {

  onModuleInit(): void {
    console.log('onUserModuleInit!')
  }

  /**
   * 用户登录
   *
   * @param {string} id 用户唯一加密ID
   * @param {{
   *       type: ClientType
   *       version: string
   *     }} client 客户端类型和版本
   * @returns {Promise<User>} 用户数据
   * @memberof UserService
   */
  async login(
    id: string,
    client: {
      type: ClientType
      version: string
    }
  ): Promise<User> {
    return { id, client, role: UserRoleType.NORMAL_USER }
  }

  async findOneById(id: string): Promise<UserPO> {
    return { id, role: UserRoleType.NORMAL_USER }
  }
}
