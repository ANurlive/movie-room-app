import type { LoaderFunctionArgs } from 'react-router-dom';
import type { LoaderData } from '../types/types';
import { LS_KEYS } from '../constants/shared';
import movieService from '../services/movie-service/movieAPIs';
import getShortMovieList from '../helpers/getShortMovieList';

export default async ({ request }: LoaderFunctionArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const searchTerm =
    url.searchParams.get('query') ||
    localStorage.getItem(LS_KEYS.INPUT_VALUE) ||
    '';
  const page = Number(url.searchParams.get('page')) || 1;
  console.log('home loader is executing');

  try {
    const { results, total_pages } = searchTerm
      ? await movieService.getMoviesList(page, searchTerm)
      : await movieService.getMoviesList(page);

    const movies = getShortMovieList(results);
    const totalPages = total_pages;
    return { movies, page, searchTerm, totalPages };
  } catch (error) {
    throw new Response(`Failed to load movies, error: ${error}`, {
      status: 500,
    });
  }
};
