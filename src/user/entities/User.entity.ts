import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  userId: string

  @Column('int')
  chatUserId: number

  @Column('text')
  chatUserName: string
}
