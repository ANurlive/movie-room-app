import type { LoaderFunctionArgs } from 'react-router-dom';
import movieService from '../../services/movie-service/movieAPIs';
import type { MovieItem } from '../../types/types';
import loader from '../detailsLoader';

jest.mock('../../services/movie-service/movieAPIs');

describe('movieDetailsLoader', () => {
  it('should return movie details for a valid ID', async () => {
    const mockMovie: MovieItem = {
      id: 123,
      title: 'Test Movie',
      overview: 'A test movie overview.',
      posterPath: '/poster.jpg',
      releaseDate: '2025-01-01',
    };

    (movieService.getMovieDetails as jest.Mock).mockResolvedValue(mockMovie);

    const args: LoaderFunctionArgs = {
      params: { id: '123' },
      request: {} as Request,
      context: null,
    };

    const result = await loader(args);
    expect(result).toEqual(mockMovie);
    expect(movieService.getMovieDetails).toHaveBeenCalledWith('123');
  });

  it('should throw a 400 error if ID is missing', async () => {
    const args: LoaderFunctionArgs = {
      params: {},
      request: {} as Request,
      context: null,
    };
    await expect(loader(args)).rejects.toThrow(
      'Movie ID is missing in route params'
    );
  });
});
