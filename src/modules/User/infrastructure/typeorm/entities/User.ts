import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

import { Role } from '@modules/Role/infrastructure/typeorm/entities/Role';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  //unique
  @Column()
  username: string;

  @Column({
    length: 150,
  })
  @Length(10, 150)
  @Exclude()
  password: string;

  @Column({
    length: 100,
  })
  @Length(10, 100)
  @IsEmail()
  email: string;

  @Column()
  avatar_url: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ default: true })
  activated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
