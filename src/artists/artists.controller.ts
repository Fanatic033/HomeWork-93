import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artists.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/images/artists' }),
  )
  async create(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    return await this.artistModel.create({
      title: artistDto.title,
      description: artistDto.description,
      image: uploadedFile ? '/images/artists/' + uploadedFile.filename : null,
    });
  }
}
