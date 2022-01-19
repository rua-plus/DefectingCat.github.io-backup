import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import cn from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { ActionKind, useRUAContext } from 'lib/store';

const SearchBox: FC = () => {
  // Add keyboard event to focus input element.
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useRUAContext();

  const router = useRouter();

  const handleSlash = useCallback((e: KeyboardEvent) => {
    if (e.key !== '/' || e.code !== 'Slash') return;
    inputRef.current?.focus();
  }, []);

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch({ type: ActionKind.SETQUERY, payload: e.target.value });
    },
    [dispatch]
  );

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;
    router.push('/search').catch();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleSlash);
    return () => window.removeEventListener('keyup', handleSlash);
  }, [handleSlash]);

  return (
    <>
      <div className="relative text-gray-700 dark:text-gray-400">
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
            'transition-all focus:z-20',
            'dark:bg-rua-gray-800'
          )}
          value={state.searchQuery}
          onChange={handleInput}
          onKeyUp={handleSearch}
        />

        <div
          className={cn(
            'absolute z-10 border flex px-1 rounded',
            'right-4 top-[50%] font-semibold',
            'transform-gpu translate-y-[-50%]',
            'border-rua-gray-600'
          )}
        >
          <code>/</code>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
