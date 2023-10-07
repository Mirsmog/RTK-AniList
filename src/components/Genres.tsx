import { FC } from 'react';
import { IGenres } from '../services/types/Anime';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setGenre } from '../redux/slices/filterSlice';
import { genreList } from '../helpers/genres';

interface GenresProps { }

const Genres: FC<GenresProps> = () => {
  const { genre } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const isCheked = genre === genre
  const onSelectGenre = (value: IGenres) => {
    if (isCheked) {
      dispatch(setGenre(IGenres['']));
    } else {
      dispatch(setGenre(value));
    }
  };

  const arrays = [];

  for (let i = 0; i < genreList.length; i += 10) {
    arrays.push(genreList.slice(i, i + 10));
  }

  return (
    <div>
      {arrays.map((subArray, i) => (
        <ul key={i}>
          {subArray.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      ))}
    </div>
  );


  return (
    <ul className='flex justify-start mt-8 gap-3 flex-wrap w-full '>
      {genreList.map((value) => (
        <label htmlFor='genreInput'
          onClick={() => onSelectGenre(value)}
          className={`${isCheked && 'text-cyan-500'
            } text-smfont-semibold hover:text-info hover:border-info cursor-pointer transition-all duration-150 flex items-center gap-1 text-slate-400 text-sm`}
        >
          <input onChange={() => { }} type="checkbox" name='genreCheckBox' className={`checkbox rounded-md border-slate-700 ${isCheked && 'checkbox-accent'} checkbox-sm`} checked={isCheked ? true : false} />
          <span>{value}</span>
        </label>
      ))}
    </ul>
  );
};
export default Genres;
