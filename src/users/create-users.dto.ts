import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniqueUserEmail } from './validators/uniqueUserEmail.validator';

export class CreateUserDto {
  @IsEmail()
  @UniqueUserEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  displayName: string;
}
