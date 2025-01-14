import { FC, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { FiHome, FiArchive, FiUser, FiSearch, FiTwitter } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import menu3 from 'react-useanimations/lib/menu3';
import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';
import useDarkMode from 'lib/hooks/useDarkMode';

const NavAvatar = dynamic(() => import('components/nav/NavAvatar'));
const NavMenuItem = dynamic(() => import('components/nav/NavMenuItem'));

export type MenuItem = {
  id: number;
  name: string;
  path: string;
  icon: IconType;
};

export const menus: MenuItem[] = [
  {
    id: 0,
    name: 'Home',
    path: '/',
    icon: FiHome,
  },
  {
    id: 1,
    name: 'Archive',
    path: '/archive',
    icon: FiArchive,
  },
  {
    id: 4,
    name: 'About',
    path: '/about',
    icon: FiUser,
  },
  {
    id: 5,
    name: 'Tweets',
    path: '/tweets',
    icon: FiTwitter,
  },
  {
    id: 6,
    name: 'Search',
    path: '/search',
    icon: FiSearch,
  },
];

const NavBar: FC = () => {
  const { isDark } = useDarkMode();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const onToggle = useCallback(() => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
  }, []);

  // Mobile menu icon must manually click to colse when click the menu item.
  const handleMenuClick = useCallback(() => {
    (iconRef.current?.children[0] as HTMLDivElement).click();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <NavAvatar />

        {/* Mobile menu button */}
        <div className="cursor-pointer md:hidden" ref={iconRef}>
          <UseAnimations
            reverse={menuIsOpen}
            size={40}
            animation={menu3}
            speed={2}
            onClick={onToggle}
            strokeColor={isDark ? 'white' : 'black'}
          />
        </div>
      </div>

      {/* Menus */}
      <div
        className={cn(
          { 'max-h-[500px]': menuIsOpen },
          { 'py-4': menuIsOpen },
          { 'max-h-0': !menuIsOpen },
          'bg-white mx-[-1.5rem] px-6 mt-4 overflow-hidden',
          'md:block md:bg-transparent md:mx-0 md:p-0',
          'transition-all duration-500 h-auto ',
          'md:max-h-max',
          'dark:bg-rua-gray-800 md:dark:bg-transparent'
        )}
      >
        {menus.map((menu) => (
          <NavMenuItem
            key={menu.id}
            onClick={handleMenuClick}
            menuItem={menu}
          />
        ))}
      </div>
    </>
  );
};

export default NavBar;
