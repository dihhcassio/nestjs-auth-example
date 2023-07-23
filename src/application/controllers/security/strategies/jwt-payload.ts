import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JwtPayload {
  @IsUUID()
  sub: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
