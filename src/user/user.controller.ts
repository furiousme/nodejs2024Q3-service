import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const user = await this.userService.create(body.login, body.password);
    return user;
  }

  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('/:id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Put('/:id')
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userService.updateUserPassword(
      id,
      body.oldPassword,
      body.newPassword,
    );
    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const deletedUserId = await this.userService.delete(id);
    return deletedUserId;
  }
}
