import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async create(login: string, password: string) {
    const id = crypto.randomUUID();
    const newUser = {
      id,
      login,
      password,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.users.push(newUser);
    return this.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updatePassword(id: string, password: string) {
    const user = await this.findById(id);
    const userIndex = this.users.findIndex((u) => u.id === id);
    const updatedUser = {
      ...user,
      password,
      updated_at: new Date().toISOString(),
      version: user.version + 1,
    };
    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  async delete(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    this.users.splice(userIndex, 1);
    return id;
  }
}
