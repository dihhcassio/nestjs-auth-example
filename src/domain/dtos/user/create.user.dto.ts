import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from 'src/domain/enums/user.role.enum';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  @IsNotEmpty()
  readonly role: UserRoleEnum;
}
