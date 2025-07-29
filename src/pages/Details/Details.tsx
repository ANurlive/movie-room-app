import { Suspense } from 'react';
import MovieCard from '../../components/MovieCard';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import type { MovieItem } from '../../types';
import Button from '../../components/Button';

export default function Details() {
  // const { movie } = useLoaderData() as { movie: MovieItem };
  const loaderData = useLoaderData() as { movie: Promise<MovieItem> };
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={loaderData.movie}>
        {(movie) => (
          <div className="flex flex-col">
            <MovieCard {...movie} />
            <Button onClick={() => navigate(-1)} className="ml-auto mt-6">
              Close
            </Button>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
