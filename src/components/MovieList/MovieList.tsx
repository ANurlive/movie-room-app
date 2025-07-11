import { Component } from 'react';
import type { MovieCardProps } from '../MovieCard/MovieCard';
import MovieCard from '../MovieCard/MovieCard';

type MovieListProps = {
  movieList: (MovieCardProps & { id: number })[] | null;
};

export default class MovieList extends Component<MovieListProps> {
  render() {
    const { movieList } = this.props;
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
