import { useEffect } from 'react';
import { HOME_PAGE_MESSAGES } from './messages';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import MovieList from '../../components/MovieList';
import useMovieLoader from './useMovieLoader';
import ErrorButton from '../../components/ErrorButton';

export default function HomePage() {
  const { inputValue, setInputValue, movieList, loading, error, loadContent } =
    useMovieLoader();

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadContent(inputValue);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  return (
    <Layout>
      <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      {loading && <Loader />}
      {error && <ErrorMessage errorCode={error} />}
      {!loading && !error && <MovieList movieList={movieList} />}
      <div className="flex justify-end">
        <ErrorButton />
      </div>
    </Layout>
  );
}
