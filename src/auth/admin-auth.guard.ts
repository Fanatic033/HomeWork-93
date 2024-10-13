import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

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

    if (user.role !== 'admin') {
      return false;
    }

    request.user = user;
    return true;
  }
}
