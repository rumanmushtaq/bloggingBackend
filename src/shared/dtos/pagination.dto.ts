import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from 'src/constants/values.constants';

export const paginationDefaultPageTransformer = (obj): number => {
  const { value } = obj;
  return +value >= 0 ? Number.parseInt(value) : PAGINATION_DEFAULT_PAGE;
};

export const paginationDefaultLimitTransformer = (obj): number => {
  const { value } = obj;
  return +value > 0 ? Number.parseInt(value) : PAGINATION_DEFAULT_LIMIT;
};

export class PaginationDto {
  @ApiProperty({ type: Number, required: false, name: 'page' })
  @IsOptional()
  @Transform(paginationDefaultPageTransformer)
  page?: number = PAGINATION_DEFAULT_PAGE;

  @ApiProperty({ type: Number, required: false, name: 'limit' })
  @IsOptional()
  @Transform(paginationDefaultLimitTransformer)
  limit?: number = PAGINATION_DEFAULT_LIMIT;
}
