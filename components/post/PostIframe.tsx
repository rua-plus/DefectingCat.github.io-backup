import { FC } from 'react';
import { Box, useMediaQuery, AspectRatio } from '@chakra-ui/react';
import useLazyLoad from 'lib/hooks/useLazyload';

interface Props {
  src: string;
}

const PostIframe: FC<Props> = ({ src, children }) => {
  const { initSrc, blur, targetRef } = useLazyLoad(src, '8px');
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <AspectRatio
        filter={blur}
        w="100%"
        transitionDuration="slower"
        ratio={isLargerThan768 ? 16 / 9 : 1}
      >
        <Box
          as="iframe"
          src={initSrc}
          ref={targetRef}
          borderRadius="10px"
          overflow="hidden"
        >
          {children}
        </Box>
      </AspectRatio>
    </>
  );
};

export default PostIframe;
