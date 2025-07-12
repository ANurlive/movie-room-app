import { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList, {
  type MovieListProps,
} from '../../components/MovieList/MovieList';
import { getMoviesList, searchMovie } from '../../services/movieAPIs';

export default class HomePage extends Component {
  state = {
    inputValue: localStorage.getItem('inputValue') || '',
    movieList: [] as MovieListProps['movieList'],
  };

  async componentDidMount(): Promise<void> {
    let list: MovieListProps['movieList'];
    try {
      if (this.state.inputValue === '') {
        list = await getMoviesList();
      } else {
        list = await searchMovie(this.state.inputValue);
      }

      console.log(list);
      this.setState({ movieList: list });
    } catch (error) {
      console.log(error);
    }
  }
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const list = await searchMovie(this.state.inputValue);
      this.setState({ movieList: list });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    localStorage.setItem('inputValue', value);
    this.setState({ inputValue: value });
  };

  render() {
    return (
      <Layout>
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={this.state.inputValue}
        />
        <MovieList movieList={this.state.movieList} />
      </Layout>
    );
  }
}
