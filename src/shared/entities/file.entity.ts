// ** Nest
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FileEntity {
  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  key: string;
}

export const FileSchema = SchemaFactory.createForClass(FileEntity);
