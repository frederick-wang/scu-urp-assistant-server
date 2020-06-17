import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ChatAdmin {
  @PrimaryGeneratedColumn()
  id: number

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
