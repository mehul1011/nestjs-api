import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserObjectDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
