import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCards from './/selectedCards/reducer';

const rootReducer = combineReducers({
  selectedCards,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
