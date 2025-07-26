import { useEffect, useState } from 'react';
import { HOME_PAGE_MESSAGES } from './messages';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import MovieList from '../../components/MovieList';
import BrokenComponent from '../../components/BrokenComponent';
import Button from '../../components/Button';
import useMovieLoader from './useMovieLoader';

export default function HomePage() {
  const [showBroken, setShowBroken] = useState<boolean>(false);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const action = (event.currentTarget as HTMLButtonElement).dataset.action;
    if (action === 'throw-error') {
      setShowBroken(true);
    }
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
        {showBroken && (
          <BrokenComponent
            errorMessage={HOME_PAGE_MESSAGES.ERROR_BUTTON_MESSAGE}
          />
        )}
        <Button onClick={handleClick} data-action="throw-error">
          {HOME_PAGE_MESSAGES.ERROR_BUTTON}
        </Button>
      </div>
    </Layout>
  );
}
