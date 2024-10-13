import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';
import { Track, TrackDocument } from '../schemas/tracks.schema';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AdminGuard } from '../auth/admin-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query() albumId: { [key: string]: string }) {
    if (albumId.album) {
      return this.trackModel.find({ album: albumId.album });
    }
    return this.trackModel.find();
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createTrack(@Body() trackDto: CreateTrackDto) {
    return await this.trackModel.create({
      title: trackDto.title,
      album: trackDto.album,
      duration: trackDto.duration,
      track_number: trackDto.track_number,
    });
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    const track = this.trackModel.findById(id);
    if (track) {
      return this.trackModel.deleteOne({ _id: id });
    }
    return { message: 'Track not found' };
  }
}
