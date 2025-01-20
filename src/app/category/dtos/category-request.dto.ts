import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'isActive is required' })
  @IsBoolean()
  isActive: boolean;
}

export class GetCategoriesDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true';
  })
  isActive?: boolean;
}
