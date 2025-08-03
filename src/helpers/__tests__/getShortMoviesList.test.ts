import type { MovieItem, ServerMovieType } from '../../types/types';
import getShortMovieList from '../getShortMovieList';

describe('getShortMovieList', () => {
  it('transforms ServerMovieType[] into MovieItem[]', () => {
    const serverData: ServerMovieType[] = [
      {
        id: 1,
        title: 'Movie One',
        overview: 'Overview One',
        poster_path: '/poster1.jpg',
        release_date: '2021-01-01',
        adult: false,
        backdrop_path: '/backdrop1.jpg',
        genre_ids: [28],
        original_language: 'en',
        original_title: 'Original One',
        popularity: 100,
        video: false,
        vote_average: 7.5,
        vote_count: 1200,
      },
      {
        id: 2,
        title: 'Movie Two',
        overview: 'Overview Two',
        poster_path: '/poster2.jpg',
        release_date: '2022-02-02',
        adult: true,
        backdrop_path: '/backdrop2.jpg',
        genre_ids: [18],
        original_language: 'fr',
        original_title: 'Original Two',
        popularity: 80,
        video: false,
        vote_average: 6.8,
        vote_count: 900,
      },
    ];

    const expected: MovieItem[] = [
      {
        id: 1,
        title: 'Movie One',
        overview: 'Overview One',
        posterPath: '/poster1.jpg',
        releaseDate: '2021-01-01',
      },
      {
        id: 2,
        title: 'Movie Two',
        overview: 'Overview Two',
        posterPath: '/poster2.jpg',
        releaseDate: '2022-02-02',
      },
    ];

    expect(getShortMovieList(serverData)).toEqual(expected);
  });

  it('returns empty array for empty input', () => {
    expect(getShortMovieList([])).toEqual([]);
  });
});
