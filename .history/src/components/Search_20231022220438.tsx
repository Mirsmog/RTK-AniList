import React from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPage, setSearchPage, setSearchValue } from '../redux/slices/filterSlice';
import { animeApi, useGetSearchedAnimeQuery } from '../services/animeApi';
import { Link } from 'react-router-dom';
import store from '../redux/store';
import MainCard from './mainCard';
import clearIcon from '/assets/clear.svg';
import searchIcon from '/src/assets/search.svg';

interface SearchProps {
  searchRef: React.RefObject<HTMLDivElement>;
  visible: boolean;
}

const Search: React.FC<SearchProps> = ({ searchRef, visible }) => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.filter.present.searchValue);
  const prevSearchValue = useAppSelector((state) =>
    state.filter.past.length > 0 ? state.filter.past[state.filter.past.length - 1].searchValue : ''
  );

  const { data, isFetching, isLoading } = useGetSearchedAnimeQuery(searchValue);
  const resultList = data?.results ? data.results : [];
  const hasNextPage = data?.hasNextPage ? data.hasNextPage : false;

  const updateSearch = React.useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 400),
    []
  );

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    e.currentTarget.value.length >= 3 && updateSearch(e.currentTarget.value);
  };

  const onClearInput = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const checkClearDate = () => {
    if (searchValue !== prevSearchValue && searchValue !== '') {
      store.dispatch(animeApi.util.resetApiState());
      dispatch(setPage(1));
      dispatch(setSearchPage(1));
    }
  };

  return (
    <div className='relative' ref={searchRef}>
      <input
        value={value}
        ref={inputRef}
        onChange={(e) => onInput(e)}
        placeholder='Search...'
        className={`w-[400px] relative top-0 right-0 z-30 focus:border-info border-2 border-slate-500 rounded-xl bg-slate-600 outline-none px-12 py-2 text-xl bg-no-repeat bg-[length:25px] bg-[center_left_14px] bg-[url("${searchIcon}")] placeholder:text-lg`}
      />
      {value && !isFetching && (
        <img
          onClick={onClearInput}
          className='absolute bottom-0 right-0 h-[48px] opacity-70 hover:opacity-100 cursor-pointer z-30'
          src={clearIcon}
          alt='clear'
        />
      )}
      {!isLoading && isFetching && (
        <span className='loading loading-spinner loading-md text-gray-400 absolute top-3 right-3 z-30'></span>
      )}
      <div
        className={`rounded-xl absolute bg-slate-700 w-full top-[82%] z-20 p-6 pr-0 shadow-slate-900 drop-shadow-md shadow-xl rounded-t-none border-slate-600 border-2 overflow-hidden transition-opacity duration-300 ${
          (!visible || resultList.length == 0) && 'opacity-0 h-0 py-0'
        } ${hasNextPage ? 'pb-2' : ''} searchTarget`}
      >
        <ul className={`flex flex-wrap gap-8 justify-center max-h-[520px] overflow-y-auto `}>
          {resultList &&
            resultList.map((item) => <MainCard isSearchCard={true} key={item.id} {...item} />)}
        </ul>
        {hasNextPage && (
          <Link
            onClick={checkClearDate}
            to={`search/${searchValue}`}
            className='showAll inline-block pt-2 text-md text-info hover:text-indigo-500 hover:underline'
          >
            show All
          </Link>
        )}
      </div>
    </div>
  );
};
export default Search;
