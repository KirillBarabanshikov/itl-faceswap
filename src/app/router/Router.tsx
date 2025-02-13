import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { Camera, Final, Home, Scene } from '@/pages';

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode={'wait'}>
      <Routes location={location} key={location.pathname}>
        <Route element={<AnimationLayout />}>
          <Route index element={<Home />} />
          <Route path={'scene'} element={<Scene />} />
          <Route path={'camera'} element={<Camera />} />
          <Route path={'final'} element={<Final />} />
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
