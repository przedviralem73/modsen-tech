// src/consts/routes.ts
import { FC } from 'react';
import Main from '../components/Main';
import ArtworkCard from '../pages/ArtworkCard';
import Favorites from '../pages/Favorites';

export interface Route {
  path: string;
  element: FC;
}

export const ROUTES: Route[] = [
  { path: '/', element: Main },
  { path: '/artwork/:id', element: ArtworkCard },
  { path: '/favorites/', element: Favorites },
];
