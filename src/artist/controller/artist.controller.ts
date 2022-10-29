import { Controller, Get, Query } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Swagger
@ApiTags('Artist')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Getting the artist info and writing it to a csv file
  // @param name: string (name of the artist)
  //@param fileName: string (name of the file to be created)
  @Get('WriteArtistInfoToCSV')
  @ApiResponse({
    status: 200,
    description: 'The artist data has been successfully written to a csv file.',
  })
  writeArtistInfoToCSV(
    @Query('name') name: string,
    @Query('fileName') fileName: string,
  ): Promise<void> {
    return this.artistService.writeArtistInfoToCSV(name, fileName);
  }
}
