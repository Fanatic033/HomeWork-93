import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from '../schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './create-users.dto';
import { LogoutAuthGuard } from '../auth/logout-auth.guard';

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

  @UseGuards(LogoutAuthGuard)
  @Delete('sessions')
  async logout(@Req() req: Request) {
    return { message: 'User logged out.', user: req.user };
  }
}
