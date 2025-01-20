import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Path is required' })
  @IsString()
  path: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Icon is required' })
  @IsString()
  icon: string;
}
