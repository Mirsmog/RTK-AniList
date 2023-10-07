import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGenres } from '../../services/types/Anime';

interface FilterState {
  searchValue: string;
  page: number;
  genre: IGenres;
}

const initialState: FilterState = {
  searchValue: '',
  page: 1,
  genre: IGenres[''],
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
    },
    setPage(state, actions: PayloadAction<number>) {
      state.page = actions.payload;
    },
    setGenre(state, actions: PayloadAction<IGenres>) {
      state.genre = actions.payload.toLocaleLowerCase().replace(/ /g, '-') as IGenres;
    },
  },
});

export const { setSearchValue, setPage, setGenre } = filter.actions;

export default filter.reducer;
