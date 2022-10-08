import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm'
import { Role } from './../roles/roles.entity'
import * as bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  image: string | null

  //roleId 2 is a regular user
  @Column({ default: 2 })
  roleId: number

  @ManyToOne(() => Role)
  role: Role

  //Hooks
  @BeforeInsert()
  @BeforeUpdate()
  async hashUserPassword() {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
