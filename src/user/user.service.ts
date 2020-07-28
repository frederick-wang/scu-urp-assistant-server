import { Injectable, HttpService } from '@nestjs/common'
import { ActiveUser, ClientType, ActiveUserPO } from './user.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatAdmin } from './entities/ChatAdmin.entity'
import { Repository } from 'typeorm'
import { User, UserRoleType } from './entities/User.entity'
import { ConfigService } from '@nestjs/config'
import { createHmac } from 'crypto'
import { pick } from 'ramda'

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(ChatAdmin)
    private chatAdminRepo: Repository<ChatAdmin>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async onModuleInit(): Promise<void> {
    console.log('onUserModuleInit!')
  }

  private async chatUserLogin(
    username: string,
    password: string
  ): Promise<{
    chatUserId: number
    chatAccessToken: string
    chatRefreshToken: string
    chatExpiresIn: number
  }> {
    const CHAT_API_PATH = this.configService.get<string>('CHAT_API_PATH')
    const url = `${CHAT_API_PATH}/login`
    const {
      data: { data }
    } = await this.httpService
      .post(url, {
        data: {
          attributes: {
            username,
            password
          }
        }
      })
      .toPromise()
    const chatUserId = Number(data.id)
    const chatAccessToken = data.attributes.access_token
    const chatRefreshToken = data.attributes.refresh_token
    const chatExpiresIn = data.attributes.expires_in
    return {
      chatUserId,
      chatAccessToken,
      chatRefreshToken,
      chatExpiresIn
    }
  }

  private async chatUserRegister(
    username: string,
    password: string
  ): Promise<{
    chatUserId: number
    chatAccessToken: string
    chatRefreshToken: string
    chatExpiresIn: number
  }> {
    const CHAT_API_PATH = this.configService.get<string>('CHAT_API_PATH')
    const url = `${CHAT_API_PATH}/register`
    const chatAdmin = await this.getChatAdmin()
    const authorization = `Bearer ${chatAdmin.chatAccessToken}`
    const {
      data: { data }
    } = await this.httpService
      .post(
        url,
        {
          data: {
            type: 'users',
            attributes: {
              username,
              password,
              register_reason: 'SCU URP Assistant'
            }
          }
        },
        {
          headers: {
            Authorization: authorization
          }
        }
      )
      .toPromise()
    const chatUserId = Number(data.id)
    const chatAccessToken = data.attributes.access_token
    const chatRefreshToken = data.attributes.refresh_token
    const chatExpiresIn = data.attributes.expires_in
    return {
      chatUserId,
      chatAccessToken,
      chatRefreshToken,
      chatExpiresIn
    }
  }

  private async chatUserChangeGroup(userid: number): Promise<void> {
    const CHAT_API_PATH = this.configService.get<string>('CHAT_API_PATH')
    const url = `${CHAT_API_PATH}/users/${userid}`
    const chatAdmin = await this.getChatAdmin()
    const authorization = `Bearer ${chatAdmin.chatAccessToken}`
    await this.httpService
      .patch(
        url,
        {
          data: {
            attributes: {
              groupId: 11
            }
          }
        },
        {
          headers: {
            Authorization: authorization
          }
        }
      )
      .toPromise()
  }

  private async getChatAdmin(): Promise<ChatAdmin> {
    const chatUserName = this.configService.get<string>('CHAT_ADMIN_USERNAME')
    const chatUserPassword = this.configService.get<string>(
      'CHAT_ADMIN_PASSWORD'
    )
    let chatAdmin = await this.chatAdminRepo.findOne({
      where: {
        chatUserName
      }
    })
    if (!chatAdmin) {
      const chatLastLoginTime = new Date()
      const {
        chatUserId,
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn
      } = await this.chatUserLogin(chatUserName, chatUserPassword)
      chatAdmin = await this.chatAdminRepo.save({
        chatUserId,
        chatUserName,
        chatUserPassword,
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn,
        chatLastLoginTime
      })
    }
    const expiresTime = new Date(
      chatAdmin.chatLastLoginTime.getTime() + chatAdmin.chatExpiresIn * 1000
    )
    const isExpired = new Date().getTime() >= expiresTime.getTime()
    if (isExpired) {
      chatAdmin.chatLastLoginTime = new Date()
      const {
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn
      } = await this.chatUserLogin(chatUserName, chatUserPassword)
      chatAdmin.chatAccessToken = chatAccessToken
      chatAdmin.chatRefreshToken = chatRefreshToken
      chatAdmin.chatExpiresIn = chatExpiresIn
      this.chatAdminRepo.save(chatAdmin)
    }
    return chatAdmin
  }

  private async getUserByUserId(userId: string): Promise<User> {
    let user = await this.userRepo.findOne({
      where: {
        userId
      }
    })
    if (!user) {
      let chatUserName: string
      for (let i = 0; i + 15 <= 64; i++) {
        chatUserName = createHmac('sha256', userId)
          .update('chat-scu-plus-for-scu-urp-assistant')
          .digest('hex')
          .slice(i, i + 15)
        const flag = await this.userRepo.findOne({
          where: {
            chatUserName
          }
        })
        if (!flag) {
          break
        }
      }
      const chatUserPassword = Array.from({ length: 2 })
        .map(() => Math.random().toString(36).substr(2))
        .join('')
        .slice(0, 16)
      const chatLastLoginTime = new Date()
      const {
        chatUserId,
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn
      } = await this.chatUserRegister(chatUserName, chatUserPassword)
      await this.chatUserChangeGroup(chatUserId)
      user = await this.userRepo.save({
        role: UserRoleType.NORMAL_USER,
        userId: userId,
        chatUserId,
        chatUserName,
        chatUserPassword,
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn,
        chatLastLoginTime
      })
    }
    const expiresTime = new Date(
      user.chatLastLoginTime.getTime() + user.chatExpiresIn * 1000
    )
    const isExpired = new Date().getTime() >= expiresTime.getTime()
    if (isExpired) {
      user.chatLastLoginTime = new Date()
      const {
        chatAccessToken,
        chatRefreshToken,
        chatExpiresIn
      } = await this.chatUserLogin(user.chatUserName, user.chatUserPassword)
      user.chatAccessToken = chatAccessToken
      user.chatRefreshToken = chatRefreshToken
      user.chatExpiresIn = chatExpiresIn
      this.userRepo.save(user)
    }
    return user
  }

  /**
   * 用户登录
   *
   * @param {string} id 用户唯一加密ID
   * @param {{
   *       type: ClientType
   *       version: string
   *     }} client 客户端类型和版本
   * @returns {Promise<ActiveUser>} 用户数据
   * @memberof UserService
   */
  async login(
    id: string,
    client: {
      type: ClientType
      version: string
    }
  ): Promise<ActiveUser> {
    const user = await this.getUserByUserId(id)
    return { id, client, ...pick(['role'], user) }
  }

  async findOneById(id: string): Promise<ActiveUserPO> {
    const user = await this.getUserByUserId(id)
    return { id, ...pick(['role'], user) }
  }
}
