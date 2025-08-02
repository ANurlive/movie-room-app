import { useDispatch } from 'react-redux';
import type { MovieItem } from '../../types/types';
import { useSelector } from 'react-redux';
import { isCardSelected } from '../../store/selectedCards/selectors';
import { toggleCard } from '../../store/selectedCards/reducer';
import Button from '../Button';
import { messages } from './messages';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Props = {
  movie: MovieItem;
  compact?: boolean;
};

export default function MovieCard({ movie, compact = false }: Props) {
  const { id, posterPath, title, overview, releaseDate } = movie;
  const dispatch = useDispatch();
  const checked = useSelector(isCardSelected(id));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = () => {
    dispatch(toggleCard(movie));
  };

  const handleShowMore = (id: number) => () => {
    const params = new URLSearchParams(searchParams);
    navigate(`/${id}?${params.toString()}`);
  };

  return (
    <div
      className="flex w-full gap-4 bg-gray-100 p-4 shadow dark:bg-white/10"
      onClick={handleChange}
    >
      <input
        type="checkbox"
        checked={checked}
        className="aspect-auto w-6"
        readOnly
      />
      <div
        className={`overflow-hidden rounded ${compact ? 'h-[100px] w-[60px]' : 'h-[150px] w-[100px]'}`}
      >
        <img
          src={`${IMAGE_BASE_URL}${posterPath}`}
          alt={`${title} movie image`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-items-start gap-2">
        <h3 className="text-sm font-bold sm:text-base md:text-xl lg:text-2xl">
          {title}
        </h3>
        <p
          className={`text-xs sm:text-sm md:text-base lg:text-lg ${compact && 'line-clamp-2'}`}
        >
          {overview}
        </p>
        <p className={`"text-xs md:text-base ${compact && 'hidden'}`}>
          {releaseDate}
        </p>

        <Button onClick={handleShowMore(id)}>
          {messages.SHOW_MORE_BUTTON}
        </Button>
      </div>
    </div>
  );
}
