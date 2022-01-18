import { AllPostsWithContent, getAllPostSlugs, getPostData } from 'lib/posts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { createElement, Fragment } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeReact from 'rehype-react';
import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/github-dark.css';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import Head from 'next/head';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FiChevronLeft } from 'react-icons/fi';
import Sticky from 'react-stickynode';
import useMediaQuery from 'lib/hooks/useMediaQuery';

const Button = dynamic(() => import('components/RUA/RUAButton'));
const Link = dynamic(() => import('components/RUA/RUALink'));
const TableOfContent = dynamic(() => import('components/post/PostTOC'));
const PostHeader = dynamic(() => import('components/post/PostHeader'));

const processedContent = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeHighlight, {
    languages: { vue: xml, bash },
    aliases: { bash: ['npm'] },
    ignoreMissing: true,
  })
  .use(rehypeSlug)
  .use(remarkGfm, { tableCellPadding: true })
  .use(rehypeReact, {
    createElement,
    components: {
      a: (props: any) => (
        <Link href={props.href} isExternal>
          {props.children}
        </Link>
      ),
    },
    Fragment,
  });

const Post = ({ postData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const matched = useMediaQuery('(max-width: 640px)');

  const { title, index_img, content, tags, date } = postData;

  const postContent = processedContent.processSync(content).result;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div
        className={cn(
          'grid grid-cols-12 gap-4 p-2 container mx-auto',
          'md:py-8'
        )}
      >
        <aside
          className={cn(
            'col-span-12 justify-end',
            'md:col-span-2 lg:col-span-1'
          )}
        >
          <Sticky enabled={!matched} top={32}>
            <Button
              className={cn(
                'flex items-center w-full',
                'text-gray-600 md:justify-center'
              )}
            >
              <FiChevronLeft className="mr-2 md:hidden" />
              BACK
            </Button>
          </Sticky>
        </aside>

        <main
          className={cn(
            'bg-white shadow-md col-span-12 rounded-lg',
            'md:col-span-10 overflow-hidden lg:col-span-8'
          )}
        >
          {index_img && (
            <div className="relative aspect-video ">
              <Image
                src={index_img}
                layout="fill"
                objectFit="cover"
                alt="Article image"
              />
            </div>
          )}

          <article className={cn('p-4 lg:p-8')}>
            <PostHeader title={title} tags={tags} date={date} />

            <section className={cn()} id={'write'}>
              {postContent}
            </section>
          </article>
        </main>

        <aside className={cn('hidden lg:block col-span-3')}>
          <Sticky enabled top={32}>
            <TableOfContent content={content} />
          </Sticky>
        </aside>
      </div>
    </>
  );
};

export default Post;

export function getStaticPaths() {
  return {
    paths: getAllPostSlugs(),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  postData: AllPostsWithContent;
}> = ({ params }) => {
  return {
    props: {
      postData: getPostData(params?.slug?.toString() ?? ''),
    },
  };
};
