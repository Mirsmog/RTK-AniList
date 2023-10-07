import { configureStore } from '@reduxjs/toolkit';
import { animeApi } from '../../services/animeApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import filter from '../slices/filterSlice';

const store = configureStore({
  reducer: {
    [animeApi.reducerPath]: animeApi.reducer,
    filter,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
