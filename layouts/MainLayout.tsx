import { FC } from 'react';
import cn from 'classnames';
import NavBar from 'components/NavBar';

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-12 container mx-auto px-4 py-8 items-stretch',
          'md:gap-4',
          'xl:grid-cols-8'
        )}
      >
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default MainLayout;
