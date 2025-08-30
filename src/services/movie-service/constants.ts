export const API_URL = 'https://api.themoviedb.org/3';
export const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA2MDdkMDJjNzYyNWNhMGFhMWMyNmEwNjMyMDY1MiIsIm5iZiI6MTc1MjA1ODc1Ny41ODYsInN1YiI6IjY4NmU0Yjg1NmQwMDdmMDY2ZDEwNDJhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YaeWD5gU1PiQBcOlqoUsX6dYHG-C6x5pW_ErVBc1CfE';

export enum MOVIE_ENDPOINT_TYPE {
  POPULAR = 'popular',
  SEARCH = 'search',
  DETAILS = 'details',
}
