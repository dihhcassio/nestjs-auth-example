import * as bcrypt from 'bcryptjs';
import { UserRoleEnum } from 'src/domain/enums/user.role.enum';
import { User } from 'src/domain/model/user.model';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'user' })
export class UserEntity extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  username?: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: false,
  })
  removed: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    if (!this.id) {
      this.uuid = uuidv4();
    }
  }
}
