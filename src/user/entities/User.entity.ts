import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export const enum UserRoleType {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    nullable: false
  })
  role: string

  @Column({
    type: 'text',
    nullable: false
  })
  userId: string

  @Column({
    type: 'int',
    nullable: false
  })
  chatUserId: number

  @Column({
    type: 'text',
    nullable: false
  })
  chatUserName: string

  @Column({
    type: 'text',
    nullable: false
  })
  chatUserPassword: string

  @Column({
    type: 'text',
    nullable: false
  })
  chatAccessToken: string

  @Column({
    type: 'text',
    nullable: false
  })
  chatRefreshToken: string

  @Column({
    type: 'int',
    nullable: false
  })
  chatExpiresIn: number

  @Column({
    type: 'datetime',
    nullable: false
  })
  chatLastLoginTime: Date
}
