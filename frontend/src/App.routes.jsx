import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
