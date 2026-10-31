import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

// This is the engine. It creates the router using the array from routes.jsx
export const router = createBrowserRouter(routes);