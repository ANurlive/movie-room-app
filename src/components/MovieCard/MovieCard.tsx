import { Component } from 'react';
import type { MovieItem } from '../../types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Props = Omit<MovieItem, 'id'>;

export default class MovieCard extends Component<Props> {
  render() {
    const { posterPath, title, overview, releaseDate } = this.props;

    return (
      <div className="flex gap-4 w-full p-4 bg-white/10">
        <div className="w-[100px] h-[150px] overflow-hidden rounded">
          <img
            src={`${IMAGE_BASE_URL}${posterPath}`}
            alt={`${title} movie image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 justify-items-start items-start">
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-xs">{overview}</p>
          <p className="text-xs">{releaseDate}</p>
        </div>
      </div>
    );
  }
}
