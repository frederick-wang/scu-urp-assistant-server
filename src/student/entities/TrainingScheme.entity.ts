import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TrainingScheme {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  majorId: number

  @Column({
    nullable: true
  })
  majorName: string

  @Column({
    nullable: true
  })
  grade: string

  @Column({
    nullable: true
  })
  department: string
}
