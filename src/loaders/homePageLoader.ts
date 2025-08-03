import type { LoaderFunctionArgs } from 'react-router-dom';
import type { LoaderData } from '../types/types';
import movieService from '../services/movie-service/movieAPIs';
import getShortMovieList from '../helpers/getShortMovieList';

export default async ({ request }: LoaderFunctionArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('query');
  const page = Number(url.searchParams.get('page')) || 1;

  const { results, total_pages } = searchTerm
    ? await movieService.getSearchList(page, searchTerm)
    : await movieService.getPopularList(page);

  const movies = getShortMovieList(results);
  const totalPages = total_pages;
  return { movies, page, totalPages };
};
