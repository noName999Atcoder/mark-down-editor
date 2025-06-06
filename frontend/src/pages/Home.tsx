import { Box, Button, Heading, VStack, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 初期画面
 */
export default function Home(): JSX.Element {
  const [fileName] = useState('');
  const [content] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate('/editor', { state: { content, fileName } });
  };

  return (
    <VStack spacing={6} mt={16}>
      <Heading>📄 Markdown Editor</Heading>

      <Input type="file" accept=".md" w="auto" />

      <Button onClick={() => navigate('/editor')} colorScheme="blue">
        新規作成
      </Button>

      {fileName && (
        <>
          <Box>
            <Text>選択されたファイル: {fileName}</Text>
          </Box>
          <Button onClick={handleOpen} colorScheme="teal">
            ▶ 開く
          </Button>
        </>
      )}
    </VStack>
  );
}
