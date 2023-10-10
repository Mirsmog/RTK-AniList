import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAnimeInfoQuery } from '../services/animeApi';
import Player from '../components/VideoPlayer/Player';
import FullCard from '../components/FullCard';
import FullAnimeSkelet from '../components/FullAnimeSkelet';

const AnimeContent: FC = () => {
  const { id = '' } = useParams();

  const {
    data: anime,
    isLoading,
    isSuccess,
    error,
  } = useGetAnimeInfoQuery(id);
  
  if (isLoading || !anime) return <FullAnimeSkelet/>
  if (error) return <h1>Something went wrong</h1>
  return (
    <div className='container mx-auto min-h-screen max-w-[1024px] flex flex-col py-16'>
      
      {anime.episodes.length > 0 &&
        <Player {...anime} />
      }
      <FullCard {...anime} />
    </div >
  );
};
export default AnimeContent;
