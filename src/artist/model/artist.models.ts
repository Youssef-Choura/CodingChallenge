// ArtistResponse is a model for the response of the last.fm api
export class ArtistResponse {
  name: string;
  mbid: string;
  url: string;
  image: Image[];
}

// Image is a nested object in the ArtistResponse object
export class Image {
  '#text': string;
  size?: string;
}

// Artist is a class that is used to define the structure of the artist object.
export class Artist extends ArtistResponse {
  image_small: string;
}
