import React, { FC } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../hooks/hooks';
import { setSearchValue } from '../redux/slices/filterSlice';

interface SearchProps {
  inView: boolean;
  inViewRef: (node: HTMLInputElement) => void;
}

const Search: FC = () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const updateSearch = React.useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 400),
    []
  );

  // const setRefs = React.useCallback(
  //   (node: HTMLInputElement) => {
  //     inputRef.current = node;
  //     inViewRef(node);
  //   },
  //   [inView]
  // );

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    e.currentTarget.value.length >= 3 && updateSearch(e.currentTarget.value);
  };

  const onClearInput = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className='relative'>
      <input
        // ref={setRefs}
        value={value}
        onChange={(e) => onInput(e)}
        placeholder='Search...'
        className='w-[400px] focus:border-info border-2 border-slate-500 rounded-xl bg-slate-600 outline-none px-12 py-2 text-xl bg-no-repeat bg-[length:25px] bg-[center_left_14px] bg-[url("/src/assets/search.svg")] placeholder:text-lg'
      />
      {value && (
        <img
          onClick={onClearInput}
          className='absolute bottom-0 right-0 h-[48px] opacity-70 hover:opacity-100 cursor-pointer'
          src='/src/assets/clear.svg'
          alt='clear'
        />
      )}
    </div>
  );
};
export default Search;
