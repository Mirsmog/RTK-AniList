import { Anime } from '@/services/types/Anime';
import { Link } from 'react-router-dom';
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarksQuery,
} from '@/services/animeApi';
import React from 'react';

interface ISearchProps extends Anime {
  isSearchCard: boolean;
}

const MainCard: React.FC<ISearchProps> = ({
  image,
  title,
  id,
  releaseDate,
  subOrDub,
  isSearchCard,
}) => {
  const [added, setAdded] = React.useState<boolean>(false);
  const [addBookmarkMutation] = useAddBookmarkMutation();
  const [delBookmarkMutation] = useDeleteBookmarkMutation();
  const { data: bookmarks = [], isLoading } = useGetBookmarksQuery();

  React.useEffect(() => {
    if (bookmarks.find((anime) => anime.id === id)) {
      setAdded(true);
    }
  }, [bookmarks]);

  const addBookmark = async (anime: Anime) => {
    const isContains = bookmarks.find((obj) => obj.id === anime.id);
    if (isContains) {
      setAdded(false);
      await delBookmarkMutation(isContains.mock_id);
    } else {
      !isLoading && setAdded(true);
      !isLoading && (await addBookmarkMutation(anime));
    }
  };

  return isSearchCard ? (
    <li className="w-full flex gap-4 relative" key={id}>
      <Link
        className=" group max-w-[140px] w-full object-cover min-h-[200px] bg-black rounded-md overflow-hidden"
        to={`anime?v=${id}`}
        onClick={() => (document.title = title)}
      >
        <img
          className="w-full h-full object-cover hover:opacity-50 transition-opacity duration-150 "
          src={image}
          alt={title}
        />
      </Link>
      <div className="w-full">
        <h3 className="text-xl font-semibold text-slate-300">
          {title || 'unknown'}
        </h3>
        <div className="grow relative">
          <span>{releaseDate || 'unknown'} / </span>
          <span
            className={`${
              subOrDub === 'dub' ? 'text-info' : 'text-indigo-500'
            } font-bold`}
          >
            {subOrDub}
          </span>
          <svg
            onClick={() => addBookmark({ id, image, title } as Anime)}
            className={`w-6 h-6 mt-auto ml-auto absolute z-[11] right-2 top-0 fill-transparent  hover:stroke-yellow-400  cursor-pointer active:scale-75 transition-all duration-200 ${
              added ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-400'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </li>
  ) : (
    <li className="relative text-center text-1xl font-semibold w-[24%] max-w-[200px] group">
      <svg
        onClick={() => addBookmark({ id, image, title } as Anime)}
        className={`w-6 h-6 mt-auto ml-auto absolute z-[11] opacity-0 group-hover:opacity-100 left-2 top-2 fill-transparent  hover:stroke-yellow-400  cursor-pointer active:scale-75 transition-all duration-200 ${
          added ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-400'
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
          strokeWidth="1.5"
        />
      </svg>
      <Link
        to={`/anime?v=${id}`}
        className="block rounded-md overflow-hidden"
        onClick={() => (document.title = title)}
      >
        <div className='relative before:content-[""] before:z-10 before:absolute before:block before:w-full before:h-full before:bg-gray-900 before:opacity-0 before:top-0 before:right-0 before:bg-no-repeat before:bg-[length:70px] before:bg-center before:bg-[url("/src/assets/play.svg")] cursor-pointer group-hover:before:opacity-90 before:transition-all before:duration-20 before:rounded-md'>
          <img
            className="h-auto object-cover w-full max-h-[300px] min-h-[300px] min-w-[200px] rounded-lg"
            src={image}
            alt={title}
          />
        </div>
      </Link>
      <h2 className="mt-2 text-slate-300">{title || 'Untitled'}</h2>
    </li>
  );
};
export default MainCard;
