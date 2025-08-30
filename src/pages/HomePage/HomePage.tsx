import { HOME_PAGE_MESSAGES } from './messages';
import SearchBar from '../../components/SearchBar';
import MovieList from '../../components/MovieList';
import ErrorButton from '../../components/ErrorButton';
import Pagination from '../../components/Pagination';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import Flyout from '../../components/Flyout';
import { useGetMoviesQuery } from '../../services/movie-service/movieApi';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import EmptySearchResult from '../../components/EmptySearchResult';

export default function HomePage() {
  const { inputValue, setInputValue, saveValueToLS } = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const isDetailsOpen = Boolean(id);

  const searchTerm = searchParams.get('query') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, error, isFetching } = useGetMoviesQuery({
    page,
    searchTerm,
  });
  const movies = data?.results ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    saveValueToLS(trimmedValue);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', trimmedValue.toString());
    setSearchParams(newParams);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  let content;
  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorMessage error={error} />;
  } else if (movies.length === 0) {
    content = <EmptySearchResult />;
  } else {
    content = (
      <>
        <MovieList movieList={movies} compactCards={isDetailsOpen} />
        <div className="flex flex-col items-center gap-10">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>

        <SearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
        />
        <div className="flex gap-6">
          <section
            className={`flex flex-col gap-10 ${isDetailsOpen ? 'w-1/3' : 'w-full'} `}
          >
            {content}
            <ErrorButton />
          </section>

          {isDetailsOpen && (
            <section className="relative w-2/3">
              <Outlet />
            </section>
          )}
        </div>
      </div>

      <Flyout />
    </>
  );
}
