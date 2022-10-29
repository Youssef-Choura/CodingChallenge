import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { writeToCSVFile } from '../utilities/data-processing.utilies';
import { ArtistResponse } from '../model/artist.models';

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
      this.httpService.get<any>(this.api_url, { params: requestParams }),
    )
      .then((response) => {
        if (!response || !response.data) {
          throw new Error(`ERROR - Request ${this.api_url} returned no data.`);
        }
        return response.data.results.artistmatches.artist;
      })
      .catch(() => {
        throw new Error(`ERROR - Request ${this.api_url} returned an error.`);
      });
  }

  // Method to get data from the Last.fm api, map it to the artist model and write it to a csv file
  writeArtistInfoToCSV(artist: string, fileName: string): Promise<void> {
    return this.getArtistByName(artist).then((results) =>
      writeToCSVFile(results, fileName),
    );
  }
}
