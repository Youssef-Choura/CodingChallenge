// OpenSearchType is an enum that defines fields of results returned by OpenSearch
enum OpenSearchType {
  QUERY = 'opensearch:Query',
  TOTAL_RESULTS = 'opensearch:totalResults',
  START_INDEX = 'opensearch:startIndex',
  ITEMS_PER_PAGE = 'opensearch:itemsPerPage',
}
// HttpAxiosResponse is the structure of the Axios response
export class HttpAxiosResponse {
  status?: number;
  data: unknown;
}

// Applying artist models to the response
export class ArtistEndpointResponse extends HttpAxiosResponse {
  data: { results: Results };
}

// Results is a class that is used to define the structure of the ArtistEndpointResponse data field.
export class Results {
  [OpenSearchType.QUERY]: OpenSearchQuery;
  [OpenSearchType.TOTAL_RESULTS]: string;
  [OpenSearchType.START_INDEX]: string;
  [OpenSearchType.ITEMS_PER_PAGE]: string;
  artistmatches: { artist: ArtistResponse[] };
  '@attr': Record<string, string>;
}

// OpenSearchQuery is a nested Object in the Results class.
class OpenSearchQuery {
  '#text': string;
  role: string;
  searchTerms: string;
  startPage: string;
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

// Artist is a class that is used to define the structure of the artist object to be written in the csv file.
export class Artist extends ArtistResponse {
  image_small: string;
}
