import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ComoFunciona from './pages/ComoFunciona';
import NaoEncontrada from './pages/NaoEncontrada';

// Hash router: as rotas funcionam em qualquer hospedagem estática (ex.: GitHub Pages),
// sem configurar redirecionamento no servidor.
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'como-funciona', element: <ComoFunciona /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
