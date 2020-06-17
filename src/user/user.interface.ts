import { User } from './entities/User.entity'

export const enum ClientType {
  URP = 'urp',
  WEB = 'web'
}

export interface JWTData {
  client: {
    type: ClientType
    version: string
  }
  id: string
}

export type ActiveUserPO = { id: string } & Pick<User, 'role'>

export type ActiveUser = JWTData & ActiveUserPO
