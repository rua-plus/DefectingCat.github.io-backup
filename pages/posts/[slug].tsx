import { getAllPostSlugs, getPostData } from '../../lib/posts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Date from '../../components/DateFormater';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import {
  createElement,
  Fragment,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Image,
  Heading,
  Flex,
  Icon,
  Link,
  Button,
  useClipboard,
  Tag,
} from '@chakra-ui/react';
import 'highlight.js/styles/github.css';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import rehypeRaw from 'rehype-raw';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import { Giscus } from '@giscus/react';

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug?.toString() ?? '');
  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // Copy code
  const [codeContent, setCodeContent] = useState('');
  const { hasCopied, onCopy } = useClipboard(codeContent);
  const copyCode: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    // Button is sibling with Code tag
    const codeToCopy = target.nextElementSibling?.textContent;
    codeToCopy && setCodeContent(codeToCopy);
  };
  useEffect(() => {
    codeContent && onCopy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeContent]);

  const processedContent = unified()
    .use(remarkParse)
    .use(remarkToc, {
      maxDepth: 3,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, {
      languages: { vue: xml, bash },
      aliases: { bash: ['npm'] },
      ignoreMissing: true,
    })
    .use(rehypeSlug)
    .use(rehypeReact, {
      createElement,
      components: {
        img: (props: any) => {
          return (
            <Zoom wrapElement="a">
              <Image borderRadius="10px" src={props.src} alt="" />
            </Zoom>
          );
        },
        a: (props: any) => {
          return (
            <Box>
              <Link display="inline-flex" alignItems="center" href={props.href}>
                {props.children}
              </Link>
            </Box>
          );
        },
        pre: (props: any) => {
          return (
            <pre {...props}>
              <Button
                size="xs"
                colorScheme="teal"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                onClick={copyCode}
              >
                {hasCopied ? 'COPYIED' : 'COPY'}
              </Button>
              {props.children}
            </pre>
          );
        },
      },
      Fragment,
    });

  const postContent = processedContent.processSync(
    `\n## Table of contents\n${postData.content}`
  ).result;

  // Process the table of content
  const tocHead = (postContent.props as any).children.shift();
  (postContent.props as any).children.shift(); // '\n'
  let toc;
  // Table of content is ul element
  if ((postContent.props as any).children[0].type === 'ul') {
    toc = (postContent.props as any).children.shift();
  }

  return (
    <>
      <Head>
        <title>RUA - {postData.title}</title>
      </Head>

      {/* Child will not be 100% height, so need alignItems="flex-start" */}
      <Flex
        h={['unset', 'unset', '100vh']}
        justifyContent="center"
        overflow="auto"
        alignItems="flex-start"
        flexFlow={['column', 'column', 'row']}
        px="0.5rem"
      >
        <Button
          size="lg"
          mt={['1rem', '1rem', '3rem']}
          position={['unset', 'unset', 'sticky']}
          top="3rem"
          onClick={() => router.back()}
        >
          BACK
        </Button>

        <Flex
          maxW={['full', 'full', '55rem', '68rem']}
          flexFlow="column"
          px={['unset', 'unset', '1.5rem']}
        >
          <Box
            borderRadius="10px"
            mt={['1rem', '1rem', '3rem']}
            shadow="lg"
            bg="white"
            overflow="hidden"
            flex="1"
          >
            {postData.index_img && (
              <Image
                src={postData.index_img}
                w="100%"
                fallback={<></>}
                fit="cover"
                alt="Head image"
              />
            )}
            <Box as="article" p={['1rem', '1rem', '2rem']}>
              <Box as="header">
                <Heading as="h1" mb="1rem">
                  {postData.title}
                </Heading>

                <Box mb="1rem">
                  {Array.isArray(postData.tags) ? (
                    // Mutil tags
                    (postData.tags as string[]).map((item) => (
                      <Tag key={item} mr="0.5rem">
                        {item}
                      </Tag>
                    ))
                  ) : (
                    // Signal tags
                    <Tag>{postData.tags}</Tag>
                  )}
                </Box>

                {/* Date */}
                <Flex alignItems="center" color="gray.600">
                  <Icon as={FiCalendar} mr="0.5rem" />
                  <Date dateString={postData.date} />
                </Flex>
              </Box>

              <Box as="section" id="write" mt="2rem">
                {postContent}
              </Box>
            </Box>
          </Box>

          <Box mt="2rem">
            <Giscus
              repo="DefectingCat/DefectingCat.github.io"
              repoId="MDEwOlJlcG9zaXRvcnkyMzk5MTUyNzk="
              category="Announcements"
              categoryId="DIC_kwDODkzRD84B_43T"
              mapping="title"
              reactionsEnabled="1"
              emitMetadata="0"
              theme="preferred_color_scheme"
            />
          </Box>

          <Footer />
        </Flex>

        {toc && (
          <Box
            display={['none', 'none', 'none', 'block']}
            position="sticky"
            top="3rem"
            mt="3rem"
          >
            {tocHead}
            {toc}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Post;
