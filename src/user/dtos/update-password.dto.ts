import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'password123', description: 'User old password' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'User new password' })
  @IsString()
  newPassword: string;
}
