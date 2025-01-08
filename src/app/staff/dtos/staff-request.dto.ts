import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/app/user/dtos/user-request.dto';

export class CreateStaffDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Role is required' })
  @IsMongoId()
  role: string;
}

export class UpdateStaffDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @ApiProperty()
  @IsNotEmpty({ message: 'Role is required' })
  @IsMongoId()
  role: string;
}

export class ResetStaffPasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
