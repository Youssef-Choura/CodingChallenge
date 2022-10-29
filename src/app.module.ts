import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArtistModule,
    // Installed the @nestjs/config package to manage environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
