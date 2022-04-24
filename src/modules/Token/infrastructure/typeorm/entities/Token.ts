import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '@modules/User/infrastructure/typeorm/entities/User';

@Entity('tokens')
export class Token {
  @PrimaryColumn()
  id: string;

  //unique
  @Column()
  encrypted: string;

  @Column({ default: false })
  expired: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
