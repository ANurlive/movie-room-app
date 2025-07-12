import { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import EmptyResult from '../EmptyResult/EmptyResult';
import type { MovieItem } from '../../types';

export type Props = {
  movieList: MovieItem[];
};

export default class MovieList extends Component<Props> {
  render() {
    const { movieList } = this.props;

    if (movieList.length === 0) {
      return <EmptyResult text="Sorry! There is no movie with such title" />;
    }

    return (
      <ul>
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
