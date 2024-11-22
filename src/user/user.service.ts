import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly logger: LoggingService,
  ) {}

  create(login: string, password: string) {
    const user = this.userRepo.create({ login, password });
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.error(`User not found: ${id}`);
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      this.logger.error(`Old password is incorrect for user: ${id}`);
      throw new ForbiddenException('Old password is incorrect');
    }

    Object.assign(user, { password: newPassword });
    await this.userRepo.save(user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.error(`User not found: ${id}`);
      throw new NotFoundException('User not found');
    }
    this.userRepo.remove(user);
  }
}
