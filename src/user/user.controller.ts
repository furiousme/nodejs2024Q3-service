import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(body.login, body.password);
    return user;
  }

  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Put('/:id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userService.updateUserPassword(id, body.password);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    const deletedUserId = await this.userService.delete(id);
    return deletedUserId;
  }
}
