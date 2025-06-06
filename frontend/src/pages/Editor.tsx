import { Box, Button, Flex, HStack, Spacer, Textarea } from '@chakra-ui/react';

export default function Editor(): JSX.Element {
  return (
    <>
      <Flex height="100vh" direction="column">
        {/* ツールバー */}
        <HStack p={2} borderBottom="1px solid" borderColor="gray.200">
          {/* 他のフォーマットボタン */}
          <Spacer />
          <Button>保存</Button>
        </HStack>

        {/* エディタとプレビューの左右分割 */}
        <Flex flex={1} overflow="hidden">
          {/* Markdown入力 */}
          <Textarea flex={1} resize="none" fontFamily="monospace" p={4} />

          {/* プレビュー */}
          <Box flex={1} p={4} overflowY="auto" bg="gray.50">
            {/* Markdownレンダリング結果 */}
          </Box>
        </Flex>

        {/* ステータスバー */}
        <Box p={2} borderTop="1px solid" borderColor="gray.200" fontSize="sm">
          文字数: 1234 | 行: 45
        </Box>
      </Flex>
    </>
  );
}
