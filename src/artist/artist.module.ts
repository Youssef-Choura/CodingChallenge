import { Module } from '@nestjs/common';
import { ArtistService } from './service/artist.service';
import { ArtistController } from './controller/artist.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  // Importing the config module and the http module
  imports: [ConfigModule, HttpModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
