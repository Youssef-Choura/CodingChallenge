import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { writeToCSVFile } from '../utilities/data-processing';
import { ArtistEndpointResponse, ArtistResponse } from '../model/artist.models';
import { handleError } from '../utilities/error-handling';

@Injectable()
export class ArtistService {
  private readonly api_key: string;
  private readonly api_url: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.api_url = configService.get('API_URL');
    this.api_key = configService.get('API_KEY');
  }
  // Method to get data (json) from the Last.fm api
  getArtistByName(artist: string): Promise<ArtistResponse[]> {
    const requestParams = {
      method: 'artist.search',
      api_key: this.api_key,
      artist: artist,
      format: 'json',
    };

    return firstValueFrom(
      this.httpService.get(this.api_url, {
        params: requestParams,
      }),
    )
      .then((data) => {
        const response = data as ArtistEndpointResponse;

        const results = response.data.results;

        if (!results || !results.artistmatches?.artist?.length) {
          throw handleError({
            errorMessage: `ERROR - Request ${this.api_url} returned no data.`,
            errorType: HttpStatus.NO_CONTENT,
            response: response.data,
          });
        }

        return results.artistmatches.artist;
      })
      .catch((error) => {
        throw handleError({
          errorMessage: `ERROR - Request ${this.api_url} returned an error.`,
          response: error,
        });
      });
  }

  // Method to get data from the Last.fm api, map it to the artist model and write it to a csv file
  async writeArtistInfoToCSV(
    artist: string,
    fileName?: string,
  ): Promise<string> {
    await this.getArtistByName(artist).then((results) =>
      writeToCSVFile(results, fileName ? fileName : artist),
    );
    return `The artist data has been successfully written to a csv file.`;
  }
}
