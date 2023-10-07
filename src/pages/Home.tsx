import React, { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimeList from '../components/AnimeList';
import ScrollButton from '../components/ScrollButton';

const Home: FC = () => {
  const { ref: searchInViewRef, inView: searchInView } = useInView({
    rootMargin: '400px 0px 0px 0px',
  });

  // const { data, error, isLoading, isFetching, isSuccess } = useGetAnimeQuery({
  //   searchValue,
  //   genre,
  //   page,
  // });

  // React.useEffect(() => {
  //   searchValue && dispatch(setGenre(IGenres['']));
  //   isSuccess && store.dispatch(animeApi.util.resetApiState());
  //   dispatch(setPage(1));
  // }, [searchValue]);

  // React.useEffect(() => {
  //   genre && dispatch(setSearchValue(''));
  //   isSuccess && store.dispatch(animeApi.util.resetApiState());
  //   dispatch(setPage(1));
  // }, [genre]);

  return (
    <div className='container mx-auto min-h-screen flex flex-col items-center justify-start '>
      <div className=' mt-12 max-w-[872px] w-full'>
        <AnimeList />
      </div>
      {!searchInView && <ScrollButton />}
    </div>
  );
};
export default Home;
