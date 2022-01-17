import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router';

const SearchBox: FC = () => {
  // Add keyboad event to foucs input element.
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const router = useRouter();

  const handleSlash = useCallback((e: KeyboardEvent) => {
    if (e.key !== '/' || e.code !== 'Slash') return;
    inputRef.current?.focus();
  }, []);

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;
    router.push({ pathname: 'search', query: { q: value } });
  };

  useEffect(() => {
    window.addEventListener('keyup', handleSlash);
    return () => window.removeEventListener('keyup', handleSlash);
  }, [handleSlash]);

  return (
    <>
      <div className="relative text-gray-700">
        <FiSearch
          className={cn(
            'absolute z-10 w-[22px] h-[22px]',
            'left-4 top-[50%] transform-gpu translate-y-[-50%]'
          )}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className={cn(
            'w-full rounded-lg outline-none relative',
            'py-5 px-12 placeholder:font-semibold',
            'focus:px-5 focus:shadow-md focus:placeholder:font-normal',
            'duration-300 transition-all focus:z-20'
          )}
          value={value}
          onChange={handleInput}
          onKeyUp={handleSearch}
        />
        <div
          className={cn(
            'absolute z-10 border flex px-1 rounded',
            'right-4 top-[50%] font-semibold',
            'transform-gpu translate-y-[-50%]'
          )}
        >
          <code>/</code>
        </div>
      </div>
    </>
  );
};

export default SearchBox;