import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGenres } from '../../services/types/Anime';
import undoable from 'redux-undo';

interface FilterState {
  searchValue: string;
  page: number;
  searchPage: number;
  genre: IGenres;
}

const initialState: FilterState = {
  searchValue: '',
  page: 1,
  searchPage: 1,
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
    setSearchPage(state, actions: PayloadAction<number>) {
      state.searchPage = actions.payload;
    },
    setGenre(state, actions: PayloadAction<IGenres>) {
      state.genre = actions.payload.toLocaleLowerCase().replace(/ /g, '-') as IGenres;
    },
  },
});

export const { setSearchValue, setPage, setGenre, setSearchPage } = filter.actions;

export default undoable(filter.reducer);
