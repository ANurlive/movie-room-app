import type { MovieItem, ServerMovieType } from '../types';

const getShortMovieList = (list: ServerMovieType[]) => {
  return list.map(
    ({ title, overview, poster_path, release_date, id }): MovieItem => ({
      title,
      overview,
      posterPath: poster_path,
      releaseDate: release_date,
      id,
    })
  );
};

export default getShortMovieList;
