import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { FileEntity } from 'src/shared/entities/file.entity';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @Type(() => FileEntity)
  image: FileEntity;

  @ApiProperty()
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsMongoId()
  category: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one tag is required.' })
  @IsString({ each: true, message: 'Each tag must be a string.' })
  tags: string[];
}
