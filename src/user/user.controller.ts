import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserObjectDTO } from './dto/createUserDTO';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}
  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userObject: UserObjectDTO) {
    // client to send all required body object, should not miss any prop (DONE using validation pipe) do npm i --save class-validator class-transformer
    return this.userService.create(userObject);
  }
  // DATA transfer object DTO - defines shape of body object

  @Get(':id/comments')
  getUserComments(@Param('id') id: string) {
    return this.commentService.findUserComments(id);
  }
  //   @Put()

  //   @Patch()

  //   @Delete()
}
