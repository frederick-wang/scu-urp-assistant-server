export const enum ClientType {
  URP = 'urp',
  WEB = 'web'
}

export const enum UserRoleType {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user'
}

export interface JWTData {
  client: {
    type: ClientType
    version: string
  }
  id: string
}

export interface UserPO {
  id: string
  role: UserRoleType
}

export type User = JWTData & UserPO
