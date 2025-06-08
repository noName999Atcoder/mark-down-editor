import { Box, HStack } from '@chakra-ui/react';

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineCode,
  AiOutlineFontSize,
  AiOutlineOrderedList,
  AiOutlineLink,
  AiOutlinePicture,
} from 'react-icons/ai';
import { IconButton } from '../IconButton';

type ToolBarProps = {};

export const ToolBar = ({}: ToolBarProps) => {
  return (
    <Box
      p="1"
      borderRadius="md"
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      <HStack wrap="wrap">
        <IconButton label="Bold" icon={<AiOutlineBold />} />
        <IconButton label="Italic" icon={<AiOutlineItalic />} />
        <IconButton label="UnderLine" icon={<AiOutlineUnderline />} />
        <IconButton label="Strikethrough" icon={<AiOutlineStrikethrough />} />
        <IconButton label="Code " icon={<AiOutlineCode />} />
        <IconButton label="FontSize" icon={<AiOutlineFontSize />} />
        <IconButton label="OrderedList" icon={<AiOutlineOrderedList />} />
        <IconButton label="Link" icon={<AiOutlineLink />} />
        <IconButton label="Picture" icon={<AiOutlinePicture />} />
      </HStack>
    </Box>
  );
};
