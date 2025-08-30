import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCards from './/selectedCards/reducer';
import { movieApi } from '../services/movie-service/movieApi';

const rootReducer = combineReducers({
  selectedCards,
  [movieApi.reducerPath]: movieApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
