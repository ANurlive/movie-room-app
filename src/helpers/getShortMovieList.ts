type ServerMovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
const getShortMovieList = (list: ServerMovieType[]) => {
  return list.map(({ title, overview, poster_path, release_date, id }) => ({
    title,
    overview,
    posterPath: poster_path,
    releaseDate: release_date,
    id,
  }));
};

export default getShortMovieList;
