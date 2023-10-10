import React, { FC } from 'react';
import { useGetAnimeEpisodeQuery } from '../../services/animeApi';
import { AnimeInfo } from '../../services/types/AnimeInfo';

interface PlayerProps extends AnimeInfo { }

const Player: FC<PlayerProps> = ({ image, episodes, title }) => {
  const localEpisode = JSON.parse(localStorage.getItem(title) || `["${episodes[0].id}"]`)
  // TODO Сократить код сохранение в localstorage
  if (!localStorage.getItem(title + '-LAST_EPISODE')) {
    localStorage.setItem(title + '-LAST_EPISODE', `"${episodes[0].id}"`)
  }

  const localLastEpisode = JSON.parse(localStorage.getItem(title + '-LAST_EPISODE') || '')
  const [completed, setCompleted] = React.useState(false)
  const [watched, setWatched] = React.useState<string[]>(localEpisode)
  const [lastEpisode, setLastEpisode] = React.useState<string>(localLastEpisode)
  const [currentEpisode, setCurrentEpisode] = React.useState<string>(lastEpisode)

  console.log(localEpisode)

  const {
    data: seria,
    isLoading,
    isSuccess,
    error,
  } = useGetAnimeEpisodeQuery(currentEpisode);
 

  const changeEpisode = (id: string) => {
    if (!watched.includes(id)) {
      setWatched((prev) => [...prev, id])
      localStorage.setItem(title, JSON.stringify(watched))
    }
    setLastEpisode(id)

    setCurrentEpisode(id);
    setCompleted(false);
    const waitHendler = () => {
      setTimeout(() => setCompleted(true), 3000)
    }
    waitHendler()
  }

  React.useEffect(() => {
    localStorage.setItem(title + '-LAST_EPISODE', JSON.stringify(lastEpisode))
  }, [lastEpisode])

  React.useEffect(() => {
    const checkHendler = () => {
      setTimeout(() => setCompleted(true), 5000)
    }
    isSuccess || isLoading ? checkHendler() : setCompleted(false)
  }, [isSuccess, isLoading])

  if (error) return <div>Get some bad request</div>

  return (
    <div className='mb-20'>
      <div className='w-full h-[576px] full-bl relative bg-black overflow-hidden mx-auto'>
        <div
          style={{ '--anime-bg-url': `url(${image})` } as React.CSSProperties}
          className={`relative w-full h-full bg-black z-10 after:bg-[image:--anime-bg-url] scale-110 after:bg-no-repeat after:bg-cover top-0 right-0 after:bg-center blur-xl brightness-50 ${completed && 'hidden'} after:absolute after:inset-8 after:top-0 after:right-0 after:w-full after:h-full after:content-[''] after:bg-black after:z-[20]`}></div>
        <iframe
          allow='autoplay'
          allowFullScreen
          scrolling='no'
          src={seria?.headers.Referer}
          className={`w-full h-full  bg-[image:--anime-bg-url] bg-no-repeat bg-cover bg-center ${!completed && 'blur-xl brightness-50'
            } flex items-center justify-center`}
        ></iframe>
        {!completed && (
          <span className='loading loading-dots text-info absolute w-24 spinnerPos z-10'></span>
        )}
      </div>
      <ul className='flex gap-3 flex-wrap px-2 py-2 max-h-48 overflow-y-auto bg-slate-900'>
        {episodes.map((episode) =>
          <li onClick={() => changeEpisode(episode.id)} className={`${watched.includes(episode.id) && episode.id !== currentEpisode && 'opacity-50 bg-indigo-600 hover:bg-indigo-700'} ${episode.id === currentEpisode && 'bg-indigo-600 hover:bg-indigo-700'} text-white btn-square btn text-lg w-12 border-none`} key={episode.id}>
            {episode.number}
          </li>
        )}
      </ul>
    </div >
  );
};
export default Player;
