import React, { FC } from 'react';
import AnimeList from '@/components/AnimeList';
import { useAppSelector } from '@/hooks/hooks';
import Genres from '@/components/Genres';
import { useGetAnimeQuery } from '@/services/animeApi';

const Home: FC = () => {
  const { page, genre } = useAppSelector((state) => state.filter.present);
  const { data, error, isLoading, isFetching, isSuccess } = useGetAnimeQuery({
    genre,
    page,
  });

  if (error) return;
  const animeList = data?.results ? data.results : [];
  const hasNextPage = data?.hasNextPage ? data.hasNextPage : false;

  React.useEffect(() => {
    document.title = 'RTK AniList'
    return () => window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className='max-w-[1320px] mx-auto min-h-screen flex flex-col items-center justify-start '>
      <div className=' mt-12 w-full'>
        <div className={'dropdown mb-6 w-full'}>
          <label
            tabIndex={0}
            className=' bg-black py-2 px-4 bg-opacity-30 rounded-md hover:bg-opacity-20 cursor-pointer inline-block'
          >
            Genres: <span className='text-indigo-500'>{genre}</span>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content right-1/6 top-12 z-[20] menu p-6 shadow bg-base-100 rounded-box w-full'
          >
            <Genres colSize={8} />
          </ul>
        </div>
        <AnimeList
          animeList={animeList}
          hasNextPage={hasNextPage}
          error={error}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};
export default Home;
