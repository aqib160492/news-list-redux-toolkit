import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news-list/newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer
  },
});
