import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BachelorDegree {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  majorCode: string

  @Column()
  majorName: string

  @Column()
  category: string

  @Column()
  approvalNumber: string

  @Column()
  remark: string
}
