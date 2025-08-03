import type { MovieItem } from '../../../types/types';
import reducer, { toggleCard, unselectAll } from '../reducer';

describe('selectedCardsSlice', () => {
  const movie: MovieItem = {
    id: 1,
    title: 'Movie 1',
    overview: 'Some overview',
    posterPath: '/poster.jpg',
    releaseDate: '2025-01-01',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ cards: {} });
  });

  it('should add a card when not selected', () => {
    const nextState = reducer({ cards: {} }, toggleCard(movie));
    expect(nextState.cards).toHaveProperty('1');
    expect(nextState.cards[1]).toEqual(movie);
  });

  it('should remove a card if it is already selected', () => {
    const state = { cards: { 1: movie } };
    const nextState = reducer(state, toggleCard(movie));
    expect(nextState.cards).not.toHaveProperty('1');
  });

  it('should unselect all cards', () => {
    const state = {
      cards: {
        1: movie,
        2: { ...movie, id: 2 },
      },
    };
    const nextState = reducer(state, unselectAll());
    expect(nextState.cards).toEqual({});
  });
});
