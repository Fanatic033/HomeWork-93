import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistsSchema } from './schemas/artists.schema';
import { Album, AlbumSchema } from './schemas/albums.schema';
import { Track, TrackSchema } from './schemas/tracks.schema';
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './schemas/users.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { UniqueUserEmailConstraint } from './users/validators/uniqueUserEmail.validator';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistsSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    UniqueUserEmailConstraint,
  ],
})
export class AppModule {}
