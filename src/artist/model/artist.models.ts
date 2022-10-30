enum OpenSearchType {
  QUERY = 'opensearch:Query',
  TOTAL_RESULTS = 'opensearch:totalResults',
  START_INDEX = 'opensearch:startIndex',
  ITEMS_PER_PAGE = 'opensearch:itemsPerPage',
}
export class HttpAxiosResponse {
  status?: number;
  data: unknown;
}

export class ArtistEndpointResponse extends HttpAxiosResponse {
  data: { results: Results };
}

export class Results {
  [OpenSearchType.QUERY]: OpenSearchQuery;
  [OpenSearchType.TOTAL_RESULTS]: string;
  [OpenSearchType.START_INDEX]: string;
  [OpenSearchType.ITEMS_PER_PAGE]: string;
  artistmatches: { artist: ArtistResponse[] };
  '@attr': Record<string, string>;
}

// ArtistResponse is a model for the response of the last.fm api
export class ArtistResponse {
  name: string;
  listeners?: string;
  streamable?: string;
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

class OpenSearchQuery {
  '#text': string;
  role: string;
  searchTerms: string;
  startPage: string;
}
