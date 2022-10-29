import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Method to get the data from the created Rest Api
  //@param name: string (name of the artist)
  @Get(':name')
  findAll(@Param('name') name: string): Promise<void> {
    return this.artistService.findAll(name);
  }
}
