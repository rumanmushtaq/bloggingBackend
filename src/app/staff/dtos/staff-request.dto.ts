import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/app/user/dtos/user-request.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

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

export class GetAllOtherStaffDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Transform(({ value }) => {
    return value === 'true';
  })
  isBlocked?: boolean;
}
