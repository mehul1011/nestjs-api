import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

// model/blueprint for the table created for user
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
