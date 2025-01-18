// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class CategoryEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Boolean, required: true })
  isActive: boolean;
}

export type CategoryDocument = CategoryEntity & Document & EntityId;
export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
