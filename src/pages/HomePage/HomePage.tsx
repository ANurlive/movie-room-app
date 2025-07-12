import { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { LS_KEYS } from '../../constants';
import type { MovieItem } from '../../types';
import movieService from '../../services/movieAPIs';

export default class HomePage extends Component {
  state = {
    inputValue: localStorage.getItem(LS_KEYS.INPUT_VALUE) || '',
    movieList: [] as MovieItem[],
    loading: false,
    error: null as string | null,
  };

  loadContent = async () => {
    this.setState({ loading: true, error: null });
    let movieList: MovieItem[];

    try {
      if (this.state.inputValue === '') {
        movieList = await movieService.getMoviesList();
      } else {
        movieList = await movieService.searchMovie(this.state.inputValue);
      }
      this.setState({ movieList, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Something wrong with the network, please check the connection',
      });
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
    const value = event.target.value;
    localStorage.setItem(LS_KEYS.INPUT_VALUE, value);
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue, movieList, loading, error } = this.state;
    if (loading) return <Loader />;
    if (error) return <ErrorMessage text={error} />;

    return (
      <Layout>
        <h2 className="visually-hidden">Home page</h2>
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
        />
        <MovieList movieList={movieList} />
      </Layout>
    );
  }
}
