import { Component } from 'react';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

export type MovieCardProps = {
  posterPath: string;
  title: string;
  overview: string;
  releaseDate: string;
};

export default class MovieCard extends Component<MovieCardProps> {
  render() {
    const { posterPath, title, overview, releaseDate } = this.props;
    return (
      <div className="flex gap-4 w-full p-4 bg-white/10 mb-4">
        <div className="w-[100px] h-[150px] overflow-hidden rounded">
          <img
            src={`${baseUrl}${posterPath}`}
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
