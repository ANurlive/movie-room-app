import MovieCard from '../../components/MovieCard';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import type { MovieItem } from '../../types/types';
import { PAGES } from '../../constants/pages';

export default function Details() {
  const movie = useLoaderData<MovieItem>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`${PAGES.HOME}${location.search}`);
  };
  return (
    <>
      <div className="sticky top-6 flex flex-col">
        <MovieCard movie={movie} showMoreButton={false} />
        <Button onClick={handleClose} className="ml-auto mt-6">
          Close
        </Button>
      </div>
    </>
  );
}
