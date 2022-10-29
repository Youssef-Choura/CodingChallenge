import * as fs from 'fs';
import { Artist, ArtistResponse } from '../model/artist.models';

// Method to replace comma in string (To have a better csv representation because name and url can contain comma)
export const ReplaceComma = (input: string): string => {
  for (let i = 0; i < input.length; i++) {
    if (input[i] === ',') {
      input = input.replace(',', '&');
    }
  }
  return input;
};

// Method to map the data from ArtistResponse model to the artist model
export const MapArtistData = (artistDataList: ArtistResponse[]): Artist[] => {
  return artistDataList.map((artist) => {
    const { name, mbid, url, image } = artist;

    return {
      name: ReplaceComma(name),
      mbid,
      url: ReplaceComma(url),
      image_small: image.find((image) => image['size'] === 'small')['#text'],
      image: image.map((obj) => ({ '#text': obj['#text'] })),
    };
  });
};

// Method to write the data to a csv file
export const writeToCSVFile = (
  artistDataList: ArtistResponse[],
  fileName: string,
): void => {
  const mappedArtistData: Artist[] = MapArtistData(artistDataList);
  const directoryPath = './src/WrittenCsvFiles/';
  // Checking if the directory exists
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath);
    } catch (err) {
      console.log(err);
    }
  }
  // Writing the data to a csv file
  // Creating a WriteStream
  const stream = fs.createWriteStream(directoryPath + fileName + '.csv', {
    flags: 'w',
  });
  // Writing the header
  const headers = 'name,mbid,url,image_small,image\n';
  stream.write(headers);

  mappedArtistData.forEach((artist) => {
    const { name, mbid, url, image_small, image } = artist;

    const line =
      name +
      ',' +
      mbid +
      ',' +
      url +
      ',' +
      image_small +
      ',' +
      image.join(';') +
      '\n';
    // Writing the data
    stream.write(line);
  });
  // Handling errors and logging results
  stream
    .on('finish', () =>
      console.log(stream.bytesWritten + ' bytes written to ' + fileName),
    )
    .on('error', (err) => console.log('error : ', err));
  // Closing the stream
  stream.end();
};
