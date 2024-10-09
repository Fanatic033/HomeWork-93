import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Artists {
  @Prop({ required: true, unique: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  image: string | null;
}
