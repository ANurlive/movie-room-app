import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MovieItem } from '../../types/types';
import omit from 'lodash/omit';
type SelectedCardsState = {
  cards: Record<number, MovieItem>;
};

const initialState: SelectedCardsState = {
  cards: {},
};
const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCard(state, action: PayloadAction<MovieItem>) {
      const id = action.payload.id;

      if (state.cards[id]) {
        state.cards = omit(state.cards, id);
      } else {
        state.cards[id] = action.payload;
      }
    },

    unselectAll(state) {
      state.cards = {};
    },
  },
});

export const { toggleCard, unselectAll } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
