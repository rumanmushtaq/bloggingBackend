import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray({ message: 'Permissions must be an array of strings.' })
  @ArrayMinSize(1, { message: 'At least one permission is required.' })
  @ArrayUnique({ message: 'Permissions must not contain duplicates.' })
  @IsMongoId({
    each: true,
    message: 'Each permission must be a valid MongoDB ObjectId.',
  })
  @Type(() => String)
  permissions: string[];
}
