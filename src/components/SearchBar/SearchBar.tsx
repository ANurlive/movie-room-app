import { Component } from 'react';
import Button, { ButtonType } from '../Button/Button';

type SearchBarProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
};

export default class SearchBar extends Component<SearchBarProps> {
  render() {
    const { handleChange, handleSubmit, inputValue } = this.props;
    return (
      <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
        <label htmlFor="search" className="visually-hidden">
          Search input
        </label>
        <input
          type="text"
          id="search"
          className="border px-1"
          onChange={handleChange}
          value={inputValue}
        />
        <Button type={ButtonType.Submit} text="Search" />
      </form>
    );
  }
}
