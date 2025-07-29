import React, { Suspense } from 'react';
import MovieCard from '../../components/MovieCard';
import {
  Await,
  useLoaderData,
  useNavigate,
  useOutletContext,
  type Location,
} from 'react-router-dom';
import Loader from '../../components/Loader';
import type { MovieItem } from '../../types';
import Button from '../../components/Button';

type ContextType = {
  lastLocation: React.RefObject<Location>;
};

export default function Details() {
  const loaderData = useLoaderData() as { movie: Promise<MovieItem> };
  const { lastLocation } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const handleClose = () => {
    const location = lastLocation.current;
    navigate(location.pathname + location.search, { replace: true });
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={loaderData.movie}>
        {(movie) => (
          <div className="flex flex-col sticky top-6">
            <MovieCard {...movie} />
            <Button onClick={handleClose} className="ml-auto mt-6">
              Close
            </Button>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
