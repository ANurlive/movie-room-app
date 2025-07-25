import { Component } from 'react';
import { SEARCH_MESSAGES } from './messages';
import Button from '../Button';

type SearchBarProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
};

export default class SearchBar extends Component<SearchBarProps> {
  render() {
    const { handleChange, handleSubmit, inputValue } = this.props;

    return (
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <label htmlFor="search" className="visually-hidden">
          {SEARCH_MESSAGES.LABEL}
        </label>
        <input
          type="text"
          id="search"
          className="border px-3 py-1 rounded text-sm focus:outline-none focus-ring-2 md:text-lg md:w-100"
          onChange={handleChange}
          value={inputValue}
          placeholder={SEARCH_MESSAGES.PLACEHOLDER}
        />
        <Button type="submit">{SEARCH_MESSAGES.BUTTON}</Button>
      </form>
    );
  }
}
