import React from 'react';
import { useGetAnimeEpisodeQuery } from '../../services/animeApi';
import { AnimeInfo } from '../../services/types/AnimeInfo';

interface PlayerProps extends AnimeInfo {}

const Player: React.FC<PlayerProps> = ({ image, episodes, title }) => {
  if (!localStorage.getItem(title + '_LAST_EPISODE')) {
    localStorage.setItem(title + '_LAST_EPISODE', JSON.stringify(episodes[0].id));
  }
  const localLastEpisode = JSON.parse(
    localStorage.getItem(title + '_LAST_EPISODE') || episodes[0].id
  );
  const localWatched = JSON.parse(
    localStorage.getItem(title + '_WATCHED_EPISODE') || `["${episodes[0].id}"]`
  );

  React.useEffect(() => {
    setCurrentEpisode(localLastEpisode);
  }, [localLastEpisode]);

  const [completed, setCompleted] = React.useState(false);
  const [watched, setWatched] = React.useState<string[]>(localWatched);
  const [currentEpisode, setCurrentEpisode] = React.useState(localLastEpisode);
  const { data: seria, isLoading, isSuccess, error } = useGetAnimeEpisodeQuery(currentEpisode);
  const episodeUrl = seria ? seria.headers.Referer : '';

  const setEpisode = (episodeId: string) => {
    setCurrentEpisode(episodeId);
    localStorage.setItem(title + '_LAST_EPISODE', JSON.stringify(episodeId));
    if (!watched.includes(episodeId)) {
      setWatched((prev) => [episodeId, ...prev]);
    }
  };

  React.useEffect(() => {
    if (watched.length > 0) {
      localStorage.setItem(title + '_WATCHED_EPISODE', JSON.stringify(watched));
    }
  }, [watched]);

  React.useEffect(() => {
    const checkHendler = () => {
      setTimeout(() => setCompleted(true), 5000);
    };
    isSuccess || isLoading ? checkHendler() : setCompleted(false);
  }, [isSuccess, isLoading]);

  if (error) return <div>Get some bad request</div>;

  return (
    <div className='mb-20'>
      <div className='w-full h-[576px] full-bl relative bg-black overflow-hidden mx-auto'>
        <div
          style={{ '--anime-bg-url': `url(${image})` } as React.CSSProperties}
          className={`relative w-full h-full bg-black z-10 after:bg-[image:--anime-bg-url] scale-110 after:bg-no-repeat after:bg-cover top-0 right-0 after:bg-center blur-xl brightness-50 ${
            completed && 'hidden'
          } after:absolute after:inset-8 after:top-0 after:right-0 after:w-full after:h-full after:content-[''] after:bg-black after:z-[20]`}
        ></div>
        <iframe
          allow='autoplay'
          allowFullScreen
          scrolling='no'
          src={episodeUrl}
          className={`w-full h-full bg-black bg-[image:--anime-bg-url] bg-no-repeat bg-cover bg-center ${
            !completed && 'blur-xl brightness-50'
          } flex items-center justify-center`}
        ></iframe>
        {!completed && (
          <span className='loading loading-dots text-info absolute w-24 spinnerPos z-10'></span>
        )}
      </div>
      <ul className='flex gap-3 flex-wrap px-2 py-2 max-h-48 overflow-y-auto bg-slate-900'>
        {episodes.map((episode) => (
          <li
            onClick={() => setEpisode(episode.id)}
            className={`${
              watched.includes(episode.id) &&
              episode.id !== currentEpisode &&
              'opacity-50 bg-indigo-600 hover:bg-indigo-700'
            } ${
              episode.id === currentEpisode && 'bg-indigo-600 hover:bg-indigo-700'
            } text-white btn-square btn text-lg w-12 border-none`}
            key={episode.id}
          >
            {episode.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Player;
