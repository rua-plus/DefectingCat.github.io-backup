import 'styles/globals.css';
import 'styles/rua.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import useRouterLoading from 'lib/hooks/useRouteLoading';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic';
import RUAStore from '../lib/store';

const H2 = dynamic(() => import('components/MDX/MDXH2'));

// MDX components
const mdxComponents = {
  h2: H2,
};

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [loading] = useRouterLoading();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/img/favicon.webp" />
        <meta name="keywords" content="Blog RUA" />
        <meta name="description" content="Personal blog." />
        <meta name="author" content="Arthur,i@rua.plus" />
      </Head>

      <RUAStore>
        <MDXProvider components={mdxComponents}>
          {getLayout(<Component {...pageProps} />)}
        </MDXProvider>
      </RUAStore>
    </>
  );
}

export default MyApp;
