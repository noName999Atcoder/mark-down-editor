import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import type { Route as TypeRoute } from './shared/types/routeType';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

function App() {
  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <Routes>
          {routes.map(({ path, element }: TypeRoute) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
