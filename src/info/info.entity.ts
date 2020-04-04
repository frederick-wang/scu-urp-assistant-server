import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class ScuUietp {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    nullable: true
  })
  projectYear: number

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  projectNumber: string

  @Column({
    type: 'int',
    nullable: true
  })
  collegeCode: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  collegeName: string

  @Column({
    type: 'mediumtext',
    nullable: true
  })
  projectName: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  projectLeaderName: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  projectLeaderCode: string

  @Column({
    type: 'int',
    nullable: true
  })
  participantNumber: number

  @Column({
    type: 'mediumtext',
    nullable: true
  })
  otherMemberInformation: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  schoolSupervisorName: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  projectLevel: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  applicationCategory: string

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  projectCategory: string

  @Column({
    type: 'int',
    nullable: true
  })
  grant: number
}
@Entity()
export class TrainingScheme {
  @PrimaryColumn()
  majorId: number

  @Column({
    nullable: true
  })
  majorName: string

  @Column()
  grade: string

  @Column()
  department: string
}

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
