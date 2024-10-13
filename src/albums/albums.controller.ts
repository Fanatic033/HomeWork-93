import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/albums.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AdminGuard } from '../auth/admin-auth.guard';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  getAll(@Query() artistId: { [key: string]: string }) {
    if (artistId.artist) {
      const id = artistId.artist;
      return this.albumModel.find({ artist: id });
    }
    return this.albumModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images/albums' }))
  async createAlbum(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    try {
      return await this.albumModel.create({
        title: albumDto.title,
        artist: albumDto.artist,
        created_at: albumDto.created_at,
        image: uploadedFile ? '/images/albums/' + uploadedFile.filename : null,
      });
    } catch (e) {
      console.error('Error creating album', e);
    }
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findById(id);
    if (album) {
      await this.albumModel.deleteOne({ _id: id });
      return { message: 'Album deleted' };
    }
    return { message: 'Album not found' };
  }
}
