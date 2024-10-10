import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Album } from './albums.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ ref: 'Album', required: true, unique: true })
  title: string;
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  album: Album;
  @Prop({ required: true })
  duration: string;
  @Prop({ required: true })
  track_number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
