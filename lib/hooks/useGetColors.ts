import { useColorModeValue } from '@chakra-ui/react';

interface UseGetColors {
  boxBg: string;
  textColor: string;
  bioColor: string;
  headingColor: string;
  giscusColor: 'light' | 'dark';
  borderColor: string;
}

const useGetColors = (): UseGetColors => {
  const boxBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.900');
  const bioColor = useColorModeValue('gray.400', 'whiteAlpha.600');
  const headingColor = useColorModeValue(
    'rgba(0, 0, 0, 0.85)',
    'whiteAlpha.800'
  );
  const borderColor = useColorModeValue('gray.500', 'whiteAlpha.300');

  // comment
  const giscusColor = useColorModeValue('light', 'dark');

  return {
    boxBg,
    textColor,
    bioColor,
    headingColor,
    giscusColor,
    borderColor,
  };
};

export default useGetColors;
