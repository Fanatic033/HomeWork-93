import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LogoutAuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const headerValue = request.get('Authorization');

    if (!headerValue) {
      return false;
    }

    const [, token] = headerValue.split(' ');

    if (!token) {
      return false;
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      return false;
    }

    user.generateToken();
    user.save();

    request.user = user;
    return true;
  }
}
