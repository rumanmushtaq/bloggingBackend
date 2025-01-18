// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FileEntity, FileSchema } from 'src/shared/entities/file.entity';

// ** Types
import { EntityId } from 'src/shared/interfaces/common.interface';

@Schema({ timestamps: true })
export class BlogEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: FileSchema, required: true })
  image: FileEntity;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryEntity',
    required: true,
  })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export type BlogDocument = BlogEntity & Document & EntityId;
export const BlogSchema = SchemaFactory.createForClass(BlogEntity);
