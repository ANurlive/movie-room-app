import { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { LS_KEYS } from '../../constants';
import type { MovieItem } from '../../types';
import movieService from '../../services/movieAPIs';
import { ApiError } from '../../helpers/handleAPIErrors';
import Button from '../../components/Button/Button';
import { HOME_PAGE_MESSAGES } from './messages';
import BrokenComponent from '../../components/BrokenComponent/BrokenComponent';

export default class HomePage extends Component {
  state = {
    inputValue: localStorage.getItem(LS_KEYS.INPUT_VALUE) || '',
    movieList: [] as MovieItem[],
    loading: false,
    error: null as number | null,
    showBroken: false,
  };

  loadContent = async () => {
    this.setState({ loading: true, error: null });
    let movieList: MovieItem[];

    try {
      if (this.state.inputValue === '') {
        movieList = await movieService.getMoviesList();
      } else {
        const trimmedInput = this.state.inputValue.trim();
        localStorage.setItem(LS_KEYS.INPUT_VALUE, trimmedInput);
        movieList = await movieService.searchMovie(trimmedInput);
      }
      this.setState({ movieList, loading: false });
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.serverMessage);
        this.setState({
          loading: false,
          error: error.status,
        });
      } else {
        console.log(HOME_PAGE_MESSAGES.UNEXPECTED_API_MESSAGE);
        this.setState({ loading: false, error: 'unexpected' });
      }
    }
  };

  async componentDidMount(): Promise<void> {
    this.loadContent();
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.loadContent();
  };

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const action = (event.currentTarget as HTMLButtonElement).dataset.action;
    if (action === 'throw-error') {
      this.setState({ showBroken: true });
    }
  };
  render() {
    const { inputValue, movieList, loading, error } = this.state;

    return (
      <Layout>
        <h2 className="visually-hidden">{HOME_PAGE_MESSAGES.HEADING}</h2>
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
        />
        {loading && <Loader />}
        {error && <ErrorMessage errorCode={error} />}
        {!loading && !error && <MovieList movieList={movieList} />}
        <div className="flex justify-end">
          {this.state.showBroken && (
            <BrokenComponent
              errorMessage={HOME_PAGE_MESSAGES.ERROR_BUTTON_MESSAGE}
            />
          )}
          <Button onClick={this.handleClick} data-action="throw-error">
            {HOME_PAGE_MESSAGES.ERROR_BUTTON}
          </Button>
        </div>
      </Layout>
    );
  }
}
