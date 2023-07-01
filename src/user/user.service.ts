import { Injectable, Param } from '@nestjs/common';
import { UserObjectDTO } from './dto/createUserDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  //   constructor(
  //     @InjectRepository(User) private readonly userRepo: Repository<User>,
  //   ) {}
  async findOne(@Param('id') id: number) {
    // this.userRepo.findOne({ where: { id: id } });
    return '';
  }

  async create(userObject: UserObjectDTO) {
    // const user = await this.userRepo.create(userObject);
    // return await this.userRepo.save(user);
    return '';
  }
}
