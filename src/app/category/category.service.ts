// ** Nest
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// ** Utils
import { handleResponse } from 'src/utils/response-handler';

// ** DTOS & Types
import {
  CreateCategoryDto,
  GetCategoriesDto,
} from './dtos/category-request.dto';

// ** Entities
import { CategoryDocument, CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  // Create Category
  async create(body: CreateCategoryDto) {
    try {
      const existingCategory = await this.findCategoryByCriteria({
        title: { $regex: new RegExp(`^${body.title}$`, 'i') },
      });

      if (existingCategory)
        throw new ConflictException('Category is already exist.');

      await this.categoryModel.create(body);

      return handleResponse('Category created successfully.');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //   Update Category
  async update(categoryId: string, body: CreateCategoryDto) {
    try {
      const existingCategory = await this.findCategoryByCriteria({
        _id: { $ne: new mongoose.Types.ObjectId(categoryId) },
        title: { $regex: new RegExp(`^${body.title}$`, 'i') },
      });

      if (existingCategory)
        throw new ConflictException('Category already exists.');

      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        categoryId,
        {
          $set: body,
        },
        {
          new: true,
        },
      );

      return handleResponse('Category updated successfully.', updatedCategory);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get categories with pagination
  async getCategoriesWithPagination(query: GetCategoriesDto) {
    try {
      const _page = query.page;
      const _limit = query.limit;
      const _skip = _page * _limit;

      const criteria = {
        ...(query?.title && {
          title: { $regex: new RegExp(query.title, 'i') } as any,
        }),
        isActive: query.isActive,
      };

      const categories = await this.categoryModel
        .find(criteria)
        .sort({ createdAt: -1 })
        .skip(_skip)
        .limit(_limit);

      const totalCount = await this.categoryModel.countDocuments(criteria);

      return handleResponse('Get Categories list.', {
        categories,
        total: totalCount,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all active categories
  async getAllCategories() {
    try {
      const categories = await this.categoryModel
        .find({
          isActive: true,
        })
        .sort({ createdAt: -1 });

      return handleResponse('Get Categories list.', categories);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Find Category By Criteria
  async findCategoryByCriteria(criteria: FilterQuery<CategoryDocument>) {
    return await this.categoryModel.findOne(criteria);
  }
}
