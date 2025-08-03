import { SEARCH_MESSAGES } from './messages';
import Button from '../Button';
import React from 'react';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
};

export default function SearchBar({
  handleChange,
  handleSubmit,
  inputValue,
}: Props) {
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <label htmlFor="search" className="visually-hidden">
        {SEARCH_MESSAGES.LABEL}
      </label>
      <input
        type="text"
        id="search"
        className="w-200 md:w-100 h-10 rounded border border-black px-3 py-1 text-sm text-black md:text-lg"
        onChange={handleChange}
        value={inputValue}
        placeholder={SEARCH_MESSAGES.PLACEHOLDER}
      />
      <Button type="submit" className="h-10 text-2xl">
        {SEARCH_MESSAGES.BUTTON}
      </Button>
    </form>
  );
}
