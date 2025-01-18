// ** Nest
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// ** Guards
import { StaffJwtGuard } from '../auth/guards/staffJwt.guard';
import { PermissionsGuard } from '../permission/guards/permission.guard';

// ** DTOS & Types
import { App_Permissions } from 'src/shared/enums/permission.enum';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import {
  CreateCategoryDto,
  GetCategoriesDto,
} from './dtos/category-request.dto';

// ** Services
import { CategoryService } from './category.service';

@ApiTags('Category Management')
@ApiBearerAuth()
@UseGuards(StaffJwtGuard, PermissionsGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new Category.' })
  @Permissions(App_Permissions.Category.ADD)
  @Post('create')
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoryService.create(body);
  }

  @ApiOperation({ summary: 'Update a Category.' })
  @Permissions(App_Permissions.Category.EDIT)
  @Put('update/:categoryId')
  async update(
    @Param('categoryId') categoryId: string,
    @Body() body: CreateCategoryDto,
  ) {
    return await this.categoryService.update(categoryId, body);
  }

  @ApiOperation({ summary: 'Get all categories with pagination.' })
  @Permissions(App_Permissions.Category.READ)
  @Get('with-pagination')
  async getCategoriesWithPagination(@Query() query: GetCategoriesDto) {
    return await this.categoryService.getCategoriesWithPagination(query);
  }

  @ApiOperation({ summary: 'Get all active categories.' })
  @Permissions(App_Permissions.Category.READ)
  @Get('all')
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }
}
