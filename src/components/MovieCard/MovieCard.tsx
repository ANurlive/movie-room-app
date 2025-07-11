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
      <div className="flex gap-4 w-full p-4">
        <div className="w-[100px]">
          <img
            src={`${baseUrl}+${posterPath}`}
            alt={`${title} movie image`}
            className="w-auto"
          />
        </div>
        <div className="flex flex-col gap-2 justify-items-start items-start">
          <h3>{title}</h3>
          <p>{overview}</p>
          <p>{releaseDate}</p>
        </div>
      </div>
    );
  }
}
