import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
    >
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="2xl">
          404
        </Heading>
        <Text fontSize="lg">ページが見つかりませんでした。</Text>
        <Button colorScheme="blue" as={Link} to="/">
          ホームに戻る
        </Button>
      </VStack>
    </Box>
  );
}
