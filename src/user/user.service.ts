import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  createUser(login: string, password: string): Promise<User> {
    return this.userRepo.create(login, password);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  findById(id: string): Promise<User> {
    return this.userRepo.findById(id);
  }

  async updateUserPassword(id: string, password: string): Promise<User> {
    return this.userRepo.updatePassword(id, password);
  }

  delete(id: string): Promise<string> {
    return this.userRepo.delete(id);
  }
}
