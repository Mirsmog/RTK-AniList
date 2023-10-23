import { FC } from 'react';
import { IGenres } from '../services/types/Anime';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setGenre, setPage } from '../redux/slices/filter';
import { genreList } from '../helpers/genres';
import chunk from 'lodash.chunk';
import store from '../redux/store';
import { animeApi } from '../services/animeApi';

interface GenresProps {
  colSize: number;
}

const Genres: FC<GenresProps> = ({colSize}) => {
  const { genre } = useAppSelector((state) => state.filter.present);
  const dispatch = useAppDispatch();
  const groupedList = chunk(genreList, colSize);

  const onSelectGenre = (value: IGenres) => {
    if (value === genre) {
      dispatch(setGenre(IGenres['']));
    } else {
      dispatch(setGenre(value));
    }
    store.dispatch(animeApi.util.resetApiState());
    dispatch(setPage(1))
  };


  return (
    <div className='flex justify-between'>
      {groupedList.map((listChuck, i) => (
        <ul className='flex flex-col gap-2' key={i}>
          {listChuck.map((item) =>
            <label key={item} htmlFor='genreInput'
              onClick={() => onSelectGenre(item)}
              className={`${item === genre && 'text-white'
                } text-smfont-semibold hover:text-info hover:border-info cursor-pointer transition-all duration-150 flex items-center gap-1 text-slate-400 text-sm`}
            >
              <input onChange={() => { }} type="checkbox" name='genreCheckBox' className={`checkbox rounded-md border-slate-700 ${item === genre && 'checkbox-accent'} checkbox-sm`} checked={item === genre ? true : false} />
              <span>{item}</span>
            </label>)}
        </ul>
      ))
      }
    </div >
  );
};
export default Genres;
