import { editorRoutes } from './editor.ts/index.tsx';
import type { Route } from '../shared/types/routeType.ts';
import Home from '../pages/Home.tsx';
import NotFound from '../pages/NotFound.tsx';

/**
 *  全てのroute情報をこのファイルで読み込む
 *  各画面はURLパスとフォルダ階層を一致させる
 * */
export const routes: Route[] = [
  // 初期画面
  { path: '/', element: <Home /> },
  ...editorRoutes,
  // 404 最初に一致したルートが使用されるため、必ず末に記載する
  { path: '*', element: <NotFound /> },
];
