import { FC } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

const Footer: FC = () => {
  return (
    <>
      <Box h="3px" w="50px" bg="gray.500" rounded="xl" mt="2.5rem" />
      <Flex as="footer" flexFlow="column" py="1.5rem">
        <Text color={'gray.600'} fontWeight="bold" mb="0.5rem">
          &copy;{new Date().getFullYear()} 小肥羊
        </Text>
        <Text color={'gray.400'} fontSize="small">
          Powered by Next.js ❤️
        </Text>
      </Flex>
    </>
  );
};

export default Footer;