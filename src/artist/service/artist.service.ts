import { Injectable } from '@nestjs/common';
import { ArtistModel } from '../model/artist.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

@Injectable()
export class ArtistService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.api_url = configService.get('API_URL');
    this.api_key = configService.get('API_KEY');
  }
  api_url: string;
  private api_key: string;
  artists: ArtistModel[];

  // Method to replace comma in string (To have a better csv representation because name and url can contain comma)
  public ReplaceComma(input: string): string {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === ',') {
        input = input.replace(',', '&');
      }
    }
    return input;
  }
  // Method to map the data from the api to the artist model
  public async MapArtists(data: any[]) {
    this.artists = data.map((artist) => {
      return {
        name: this.ReplaceComma(artist.name),
        mbid: artist.mbid,
        url: this.ReplaceComma(artist.url),
        image_small: artist.image[1]['#text'],
        image: artist.image.map((image) => {
          return image['#text'];
        }),
      };
    });
  }
  // Method to parse the data to a csv file
  async parse(artist: string) {
    // Creating a WriteStream
    const stream = fs.createWriteStream(
      './src/WrittenCsvFiles' + '/' + artist + '.csv',
      'utf8',
    );
    // Handling errors
    stream.on('error', (err) => console.log('error : ', err));
    // Writing the headers
    stream.write('name,mbid,url,image_small,image\n', 'utf8');
    // writing the data
    this.artists.forEach((artist) => {
      stream.write(
        `${artist.name},${artist.mbid},${artist.url},${artist.image_small},${
          '[ "' + artist.image.join('";"') + '" ]\n'
        }`,
        'utf8',
      );
    }, this);
    // Closing the stream
    stream.on('finish', () => console.log('finished'));
    stream.end();
  }
  // Method to get data from the Last.fm api, map it to the artist model then parse it to a csv file
  public findAll(artist: string): Promise<void> {
    return (
      this.httpService
        // Calling the api
        .get(
          this.api_url +
            '&api_key=' +
            this.api_key +
            '&artist=' +
            artist +
            '&format=json',
        )
        // Mapping the data to the artist model and parsing it to a csv file once the data is received
        .forEach((response) => {
          const data = response.data.results.artistmatches.artist;
          this.MapArtists(data).then(() => {
            console.log(this.artists);
            this.parse(artist).then(() => {
              console.log('done');
            });
          });
        })
        // Handling errors
        .catch((e) => {
          console.log(e);
          throw new Error('error : ' + e);
        })
    );
  }
}
