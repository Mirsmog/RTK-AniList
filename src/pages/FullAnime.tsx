import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAnimeInfoQuery } from '../services/animeApi';
import Player from '../components/VideoPlayer/Player';
import FullCard from '../components/FullCard';

const AnimeContent: FC = () => {
  const { id = '' } = useParams();

  const {
    data: anime,
    isLoading: animeIsLoading,
    isSuccess: animeIsSuccess,
    error: animeError,
  } = useGetAnimeInfoQuery(id);
  if (!anime) return

  return (
    <div className='container mx-auto min-h-screen max-w-[1024px] flex flex-col pt-20'>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><a>Documents</a></li>
          <li>Add Document</li>
        </ul>
      </div>
      {anime.episodes.length > 0 &&
        <Player {...anime} />
      }
      <FullCard {...anime} />
    </div >
  );
};
export default AnimeContent;
