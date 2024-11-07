import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(login: string, password: string): Promise<User> {
    return this.userRepo.create(login, password);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  findById(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is incorrect');

    const updatedUser = new User({
      ...user,
      password: newPassword,
      updated_at: new Date().toISOString(),
      version: user.version + 1,
    });

    return this.userRepo.updatePassword(id, updatedUser);
  }

  async delete(id: string): Promise<string> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepo.delete(id);
  }
}
