import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Artist } from './artists.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true, ref: 'Artist', unique: true })
  title: string;
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  artist: Artist;
  @Prop()
  created_at: string;
  @Prop()
  image: string | null;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
