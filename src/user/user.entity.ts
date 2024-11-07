import { Exclude } from 'class-transformer';

export class User {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  created_at: string;

  updated_at: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
