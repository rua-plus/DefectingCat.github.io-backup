import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import theme from './lib/theme';

interface ChakraProps {
  cookies?: string;
  children: ReactNode;
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return (
    <ChakraProvider
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
      theme={theme}
    >
      {children}
    </ChakraProvider>
  );
};

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>;

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
}
