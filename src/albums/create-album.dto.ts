import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  artist: string;
  created_at: string;
}
