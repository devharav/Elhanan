import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import App from '../App';

const router = createBrowserRouter([
 {
    path: '/',
    element: <App />, // layout wrapper
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export default router;
