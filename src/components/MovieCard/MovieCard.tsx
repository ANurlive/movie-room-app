import { useDispatch } from 'react-redux';
import type { MovieItem } from '../../types/types';
import { useSelector } from 'react-redux';
import { isCardSelected } from '../../store/selectedCards/selectors';
import { toggleCard } from '../../store/selectedCards/reducer';
import Button from '../Button';
import { messages } from './messages';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard(movie: MovieItem) {
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
    <div className="flex gap-4 w-full p-4 bg-white/10" onClick={handleChange}>
      <input type="checkbox" checked={checked} className="w-6 aspect-auto" />

      <div className="w-[100px] h-[150px] overflow-hidden rounded">
        <img
          src={`${IMAGE_BASE_URL}${posterPath}`}
          alt={`${title} movie image`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 justify-items-start items-start">
        <h3 className="font-bold text-sm sm:text-base md:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">{overview}</p>
        <p className="text-xs md:text-base">{releaseDate}</p>

        <Button onClick={handleShowMore(id)}>
          {messages.SHOW_MORE_BUTTON}
        </Button>
      </div>
    </div>
  );
}
