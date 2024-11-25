import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingService } from 'src/logging/logging.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly logger: LoggingService,
  ) {}

  async create(login: string, password: string) {
    const user = this.userRepo.create({ login, password });
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findById(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  findByLogin(login: string): Promise<User | null> {
    return this.userRepo.findOneBy({ login });
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.error(`User not found: ${id}`, 'UserService');
      throw new NotFoundException('User not found');
    }

    const oldHashedPassword = this.authService.getHashedPassword(oldPassword);

    if (user.password !== oldHashedPassword) {
      this.logger.error(
        `Old password is incorrect for user: ${id}`,
        'UserService',
      );
      throw new ForbiddenException('Old password is incorrect');
    }

    const newHashedPassword = this.authService.getHashedPassword(newPassword);

    Object.assign(user, { password: newHashedPassword });
    await this.userRepo.save(user);
    this.logger.log(`Password updated for user: ${id}`, 'UserService');
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.error(`User not found: ${id}`, 'UserService');
      throw new NotFoundException('User not found');
    }
    this.userRepo.remove(user);
  }
}
