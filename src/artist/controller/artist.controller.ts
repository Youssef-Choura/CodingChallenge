import { Controller, Get, Query } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
// Query parameters

// Swagger
@ApiTags('Artist')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Getting the artist info and writing it to a csv file

  // @param fileName: string (name of the file to be created)
  @ApiImplicitQuery({
    name: 'fileName',
    description: 'Name of the file to be created',
    required: false,
    type: String,
  })
  // @param name: string (name of the artist)
  @ApiImplicitQuery({
    name: 'name',
    description: 'Name of the artist',
    required: true,
    type: String,
  })
  @Get('WriteArtistInfoToCSV')
  @ApiOkResponse({
    description: 'The artist data has been successfully written to a csv file.',
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  writeArtistInfoToCSV(
    @Query('name') name: string,
    @Query('fileName') fileName: string,
  ): Promise<void> {
    return this.artistService.writeArtistInfoToCSV(name, fileName);
  }
}
