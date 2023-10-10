import { FC } from 'react';
import { Anime } from '../../services/types/Anime';
import { Link } from 'react-router-dom';

interface ISearchProps extends Anime { }

const MainCard: FC<ISearchProps> = ({ image, title, id }) => {
  return (
    <li className=' text-center text-1xl font-semibold w-[24%] max-w-[200px] group'>
      <Link to={`/anime/${id}`} className='block rounded-md overflow-hidden'>
        <div className='relative before:content-[""] before:z-10 before:absolute before:block before:w-full before:h-full before:bg-gray-900 before:opacity-0 before:top-0 before:right-0 before:bg-no-repeat before:bg-[length:70px] before:bg-center before:bg-[url("/src/assets/play.svg")] cursor-pointer group-hover:before:opacity-90 before:transition-all before:duration-20 before:rounded-md'>
          <img
            className='h-auto object-cover w-full max-h-[300px] min-h-[300px] min-w-[200px] rounded-lg'
            src={image}
            alt={title}
          />
        </div>
      </Link>
      <h2 className='mt-2'>{title || 'Untitled'}</h2>
    </li>
  );
};
export default MainCard;
