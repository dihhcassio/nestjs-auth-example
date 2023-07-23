import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UserRoleEnum } from 'src/domain/enums/user.role.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @IsUUID()
  readonly id: string;

  @ApiProperty({ required: false })
  @MaxLength(60)
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ required: false })
  @MaxLength(60)
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty({ enum: ['ADMIN', 'PREFEITO'] })
  @IsNotEmpty()
  readonly role: UserRoleEnum;
}
