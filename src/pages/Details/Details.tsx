import MovieCard from '../../components/MovieCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { PAGES } from '../../constants/pages';
import { useGetMovieDetailsQuery } from '../../services/movie-service/movieApi';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isFetching,
    error,
  } = useGetMovieDetailsQuery(id as string, { skip: !id });

  const handleClose = () => {
    navigate(`${PAGES.HOME}${location.search}`);
  };
  return (
    <>
      <div className="sticky top-6 flex flex-col" data-testid="details">
        {(isLoading || isFetching) && <Loader />}
        {error && <ErrorMessage error={error} />}
        {movie && <MovieCard movie={movie} showMoreButton={false} />}

        <Button onClick={handleClose} className="ml-auto mt-6">
          Close
        </Button>
      </div>
    </>
  );
}
