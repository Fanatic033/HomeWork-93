import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from '../schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './create-users.dto';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  async registerUser(@Body() userDto: CreateUserDto) {
    const user = new this.userModel({
      email: userDto.email,
      password: userDto.password,
      displayName: userDto.displayName,
    });
    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Req() req: Request) {
    return req.user;
  }

  @Delete()
  async logout(@Req() req: Request) {
    const token = req.get('Authorization');
    if (!token) {
      throw new UnauthorizedException();
    }
    const user = (await this.userModel.findOne({ token })) as UserDocument;
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.generateToken();
    await user.save();
    return { message: 'User logged out.' };
  }
}
