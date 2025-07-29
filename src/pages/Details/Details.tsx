import { Suspense } from 'react';
import MovieCard from '../../components/MovieCard';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import type { MovieItem } from '../../types';

export default function Details() {
  const { movie } = useLoaderData<DeferredData<MovieItem>>();
  const navigate = useNavigate();
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={movie}>
        {(movie) => (
          <div>
            <MovieCard {...movie} />
            <button onClick={() => navigate(-1)} className="mt-4">
              Close
            </button>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
