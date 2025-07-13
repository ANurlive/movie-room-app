import { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import EmptySearchResult from '../EmptySearchResult/EmptySearchResult';
import type { MovieItem } from '../../types';

export type Props = {
  movieList: MovieItem[];
};

export default class MovieList extends Component<Props> {
  render() {
    const { movieList } = this.props;

    if (movieList.length === 0) {
      return <EmptySearchResult />;
    }

    return (
      <ul className="flex flex-col gap-4">
        {movieList &&
          movieList.map(({ id, ...rest }) => {
            return (
              <li key={id}>
                <MovieCard {...rest} />
              </li>
            );
          })}
      </ul>
    );
  }
}
