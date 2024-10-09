import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true, unique: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  image: string | null;
}

export const ArtistsSchema = SchemaFactory.createForClass(Artist);
