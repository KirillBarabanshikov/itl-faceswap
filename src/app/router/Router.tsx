import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { Home } from '@/pages';

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode={'wait'}>
      <Routes location={location} key={location.pathname}>
        <Route element={<AnimationLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const AnimationLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Outlet />
    </motion.div>
  );
};
