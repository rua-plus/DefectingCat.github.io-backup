import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';
import { AllPostsData } from '../lib/posts';
import { useDispatch } from 'react-redux';
import { setFromPath } from '../features/router/routerSlice';
import { useRouter } from 'next/router';
import useGetColors from '../lib/hooks/useGetColors';
import useLazyLoad from '../lib/hooks/useLazyload';
import dynamic from 'next/dynamic';

const Date = dynamic(() => import('./DateFormater'));

interface Props {
  post: AllPostsData;
}

const ArchiveCard: FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { initSrc, blur, targetRef } = useLazyLoad(post.index_img);

  const { borderColor, headingColor } = useGetColors();

  const goToPost: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(setFromPath(location.pathname));
    router.push(`/posts/${post.url}`);
  };

  return (
    <>
      <Box as="article" borderBottom="1px" borderColor={borderColor}>
        <Link
          href={`/posts/${post.url}`}
          onClick={goToPost}
          _focus={{ boxShadow: 'unset' }}
        >
          <Flex
            p="1.25rem"
            key={post.url}
            cursor="pointer"
            justifyContent="space-between"
          >
            <Box>
              <Heading mb="0.6rem" fontSize="lg" color={headingColor}>
                {post.title}
              </Heading>
              <Date dateString={post.date} />
            </Box>
            {post.index_img && (
              <Image
                ref={targetRef}
                transitionDuration="slower"
                filter={blur}
                src={initSrc}
                alt="Post image"
                w="50px"
                h="50px"
                objectFit="cover"
                rounded="lg"
              />
            )}
          </Flex>
        </Link>
      </Box>
    </>
  );
};

export default ArchiveCard;
