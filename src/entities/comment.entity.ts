import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Topic } from './topic.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => User, (user) => user.comments)
  //type is  other side of the relation, and return runs a callback function
  // for current user comments
  user: User;

  @ManyToOne((type) => Topic, (topic) => topic.comments)
  topic: Topic;
}
