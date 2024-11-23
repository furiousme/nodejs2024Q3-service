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
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  invalidIdResponseExample,
  userNotFoundExample,
  userResponseExample,
  userUpdatedResponseExample,
} from '../response-examples';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * Get all users
   */
  @ApiOkResponse({
    description: 'List all users',
    example: [userResponseExample],
  })
  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  /**
   *
   * Get user by id
   */
  @ApiOkResponse({
    type: User,
    description: 'Get user by id',
    example: userResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    example: userNotFoundExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @Get('/:id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  /**
   *
   * Update user password
   */
  @ApiOkResponse({
    type: User,
    description: 'User password updated',
    example: userUpdatedResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiBody({ type: UpdatePasswordDto })
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

  /**
   *
   * Delete user
   */
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.delete(id);
  }
}
