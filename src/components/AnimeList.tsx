import { useInView } from 'react-intersection-observer';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPage, setSearchPage } from '../redux/slices/filterSlice';
import MainCard from './mainCard';
import MainCardSkelet from './mainCard/skeleton';
import Spinner from './Spinner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Anime } from '../services/types/Anime';
import { useLocation } from 'react-router-dom';

interface AniListProps {
  animeList: Anime[];
  hasNextPage: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
}

const AnimeList: FC<AniListProps> = ({
  animeList,
  hasNextPage,
  isFetching,
  isLoading,
  isSuccess,
}) => {
  const { ref, inView } = useInView({});
  const page = useAppSelector((state) => state.filter.present.page);
  const searchPage = useAppSelector((state) => state.filter.present.searchPage);
  const path = useLocation();
  const isSearchPage = path.pathname.includes('/search/');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    inView && hasNextPage && nextPage();
  }, [isSuccess, inView]);

  const nextPage = () => {
    isSearchPage ? dispatch(setSearchPage(searchPage + 1)) : dispatch(setPage(page + 1));
  };

  const items = animeList.map((obj) => <MainCard isSearchCard={false} {...obj} key={obj.id} />);
  const skeletons = [...Array(12)].map((_, i) => <MainCardSkelet key={i} />);

  return (
    <ul className='flex flex-wrap gap-x-6 flex-gap gap-y-8 mb-12'>
      {!isLoading ? items : skeletons}
      {isSuccess && <div ref={ref}></div>}
      {isFetching && !isLoading && <Spinner />}
    </ul>
  );
};
export default AnimeList;
