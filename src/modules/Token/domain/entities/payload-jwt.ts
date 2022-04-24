import { RolesEnum } from '@modules/Role/domain/entities/role-enum';
import { IsString } from 'class-validator';

export class PayloadJwt {
  @IsString()
  public username: string;

  @IsString()
  public email: string;

  @IsString()
  public role: RolesEnum;
}
