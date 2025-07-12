import { Component } from 'react';
import type { MovieCardProps } from '../MovieCard/MovieCard';
import MovieCard from '../MovieCard/MovieCard';

export type MovieListProps = {
  movieList: (MovieCardProps & { id: number })[] | null;
};

export default class MovieList extends Component<MovieListProps> {
  render() {
    const { movieList } = this.props;
    if (movieList?.length === 0) {
      return <div className="">Sorry! There is no movie with such title</div>;
    }
    return (
      <ul>
        {movieList &&
          movieList.map(({ title, overview, posterPath, releaseDate, id }) => {
            return (
              <li key={id}>
                <MovieCard
                  title={title}
                  overview={overview}
                  posterPath={posterPath}
                  releaseDate={releaseDate}
                />
              </li>
            );
          })}
      </ul>
    );
  }
}
