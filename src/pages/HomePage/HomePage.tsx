import { HOME_PAGE_MESSAGES } from './messages';
import SearchBar from '../../components/SearchBar';
import MovieList from '../../components/MovieList';
import useMovieLoader from './useLocalStorage';
import ErrorButton from '../../components/ErrorButton';
import Pagination from '../../components/Pagination';
import { useLoaderData, useNavigate } from 'react-router-dom';
import type { LoaderData } from '../../types';

export default function HomePage() {
  const { movies, page, totalPages } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const { inputValue, setInputValue, saveValueToLS } = useMovieLoader();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveValueToLS(inputValue);
    navigate(`/search?query=${inputValue.trim()}`);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleCardClick = (id: number) => {
    console.log(id);
    navigate(`/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />

      <MovieList movieList={movies} handleCardClick={handleCardClick} />
      {movies.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} className="" />
      )}

      <ErrorButton className="flex justify-end" />
    </div>
  );
}
