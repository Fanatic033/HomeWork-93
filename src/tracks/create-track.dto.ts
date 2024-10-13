import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  album: string;
  @IsNotEmpty()
  title: string;
  duration: string;
  track_number: number;
}
