import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const getSelectedCards = (state: RootState) => state.selectedCards.cards;

export const isCardSelected = (id: number) =>
  createSelector([getSelectedCards], (cards) => !!cards[id]);
