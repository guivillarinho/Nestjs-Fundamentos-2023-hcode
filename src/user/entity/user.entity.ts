import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  @Column({ length: 200 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ nullable: true })
  birthAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: string;
}
