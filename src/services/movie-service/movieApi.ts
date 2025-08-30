import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_TOKEN, API_URL, MOVIE_ENDPOINT_TYPE } from './constants';
import type {
  getDetailsResponse,
  MovieItem,
  MoviesGetResponse,
} from '../../types/types';
import { getMovieEndpoint } from './utils/getMovieEndpoint';
import getShortMovieList from '../../helpers/getShortMovieList';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<
      { results: MovieItem[]; totalPages: number },
      { page: number; searchTerm: string | undefined }
    >({
      query: ({ page = 1, searchTerm }) => {
        if (searchTerm) {
          return getMovieEndpoint(MOVIE_ENDPOINT_TYPE.SEARCH, {
            page,
            searchTerm,
          });
        }
        return getMovieEndpoint(MOVIE_ENDPOINT_TYPE.POPULAR, { page });
      },

      transformResponse: (response: MoviesGetResponse) => ({
        results: getShortMovieList(response.results),
        totalPages: response.total_pages,
      }),
    }),

    getMovieDetails: builder.query<MovieItem, string>({
      query: (movieId) =>
        getMovieEndpoint(MOVIE_ENDPOINT_TYPE.DETAILS, { id: movieId }),
      transformResponse: (response: getDetailsResponse): MovieItem => ({
        id: response.id,
        title: response.title,
        overview: response.overview,
        posterPath: response.poster_path,
        releaseDate: response.release_date,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = movieApi;
