import { Controller, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User, UserDocument } from '../schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Post()
  registerUser(@Req() req: Request) {
    const user = new this.userModel({
      email: req.body.email,

      password: req.body.password,

      displayName: req.body.displayName,

      role: req.body.role,
    });

    user.generateToken();

    return user.save();
  }
}
