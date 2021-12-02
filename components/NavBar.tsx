import { FC, MouseEvent, useRef } from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Flex,
  Icon,
  useDisclosure,
  Collapse,
  useMediaQuery,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import UseAnimations from 'react-useanimations';
import menu3 from 'react-useanimations/lib/menu3';
import {
  FiHome,
  FiArchive,
  FiUser,
  FiSun,
  FiMoon,
  FiSearch,
} from 'react-icons/fi';
import useGetColors from 'lib/hooks/useGetColors';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Search = dynamic(() => import('./search'));
const ImageSpinner = dynamic(() => import('components/ImageSpinner'));

const menu = [
  {
    id: 0,
    name: '首页',
    path: '/',
    icon: FiHome,
  },
  {
    id: 1,
    name: '归档',
    path: '/archive',
    icon: FiArchive,
  },
  // {
  //   id: 2,
  //   name: '闲言',
  //   path: '/message',
  //   icon: FiMessageSquare,
  // },
  // {
  //   id: 3,
  //   name: '密语',
  //   path: '/pgp',
  //   icon: FiLock,
  // },
  {
    id: 4,
    name: '关于',
    path: '/about',
    icon: FiUser,
  },
  {
    id: 5,
    name: '搜索',
    icon: FiSearch,
  },
];

interface MenuListProps {
  boxBg: string;
  handleMenuClick: (
    // eslint-disable-next-line no-unused-vars
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    // eslint-disable-next-line no-unused-vars
    path?: string
  ) => void;
}
const MenuList: FC<MenuListProps> = ({ boxBg, handleMenuClick }) => {
  return (
    <Flex
      as="nav"
      mt={['1.5rem', null]}
      flexFlow={['column']}
      py={['1rem', null, 'unset']}
      px={['2rem', '4rem', 'unset']}
      bg={[boxBg, null, 'unset']}
      shadow={['card', null, 'unset']}
    >
      {menu.map((item) => {
        return (
          <Flex
            onClick={(e) => handleMenuClick(e, item?.path)}
            href={item.path}
            key={item.id}
            as="a"
            alignItems="center"
            justifyContent={['unset', null, 'space-between']}
            fontSize={['18', null, '22']}
            my={['0.5rem', null, '0.5rem']}
            cursor="pointer"
          >
            <Icon as={item.icon} mr={['2.5rem', null, 'unset']} />
            <Text>{item.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

const NavBar: FC = () => {
  const router = useRouter();

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  // Menu toggle
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  // Modal toggle
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const { boxBg, bioColor, textColor, headingColor } = useGetColors();

  const iconRef = useRef<HTMLDivElement>(null);
  // Switch pages
  const handleMenuClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    path?: string
  ) => {
    e.preventDefault();

    if (path) {
      !isLargerThan768 &&
        // Click the animate icon.
        (iconRef.current?.children[0] as HTMLDivElement).click();
      router.push(path);
    } else {
      onModalOpen();
    }
  };

  return (
    <>
      <Box
        color={textColor}
        w={[null, null, '8rem']}
        p={['3rem 1rem 1rem 1rem', null, 'unset']}
        position={'relative'}
        flex={[1, 1, 'unset']}
      >
        <Box
          position={'relative'}
          boxSize="8rem"
          borderRadius="full"
          boxShadow={'card'}
        >
          {/* avatar */}
          <Image
            borderRadius="full"
            src="/images/img/avatar.svg"
            objectFit={'cover'}
            alt="Avatar"
            fallback={<ImageSpinner />}
          />
          {/* emoji on avatar */}
          <Flex
            boxShadow={'card'}
            position={'absolute'}
            bottom={0}
            right={0}
            rounded={'full'}
            bg={boxBg}
            h="40px"
            w="40px"
            justify="center"
            alignItems={'center'}
          >
            ❤️
          </Flex>
        </Box>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          mt="0.8rem"
          mb="0.5rem"
        >
          <Heading color={headingColor} size={'lg'}>
            肥羊
          </Heading>
          <Button
            background="transparent"
            fontSize={['18', null, '22']}
            onClick={toggleColorMode}
            aria-label="Switch color mode"
          >
            {colorMode === 'light' ? <Icon as={FiSun} /> : <Icon as={FiMoon} />}
          </Button>
        </Flex>

        <Text color={bioColor}>一条咸鱼.</Text>

        {/* Menu */}
        <Box mx={['-2rem', '-4rem', 'unset']}>
          {/* Mobile menu */}
          <Box
            as={Collapse}
            in={isOpen}
            animateOpacity
            display={[null, null, 'none']}
          >
            <MenuList boxBg={boxBg} handleMenuClick={handleMenuClick} />
          </Box>
          {/* Desktop menu */}
          <Box display={['none', 'none', 'block']}>
            <MenuList boxBg={boxBg} handleMenuClick={handleMenuClick} />
          </Box>
        </Box>

        {/* Mobile menu icon */}
        <Box
          display={[null, null, 'none']}
          position={'absolute'}
          top={'1.5rem'}
          right={'1rem'}
          ref={iconRef}
        >
          <UseAnimations
            reverse={isOpen}
            size={40}
            animation={menu3}
            speed={2}
            onClick={onToggle}
          />
        </Box>
      </Box>

      <Search isModalOpen={isModalOpen} onModalClose={onModalClose} />
    </>
  );
};

export default NavBar;
