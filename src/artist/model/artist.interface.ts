import { ImageModel } from './image.interface';

// ArtistModel is an interface that is used to define the structure of the artist object.
export interface ArtistModel {
  name: string;
  mbid: string;
  url: string;
  image_small: string;
  image: ImageModel[];
}
