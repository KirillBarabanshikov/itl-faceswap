import { motion, Transition } from 'framer-motion';
import { FC } from 'react';

import itlImage from '@/shared/assets/images/itl.svg';

import styles from './BackgroundAnimation.module.scss';

const transition: Transition = {
  repeatType: 'mirror',
  repeat: Infinity,
  duration: 8,
  ease: 'linear',
};

export const BackgroundAnimation: FC = () => {
  return (
    <div className={styles.backgroundAnimation}>
      <motion.img
        src={itlImage}
        alt={''}
        animate={{ x: ['-142px', '-3000px'] }}
        transition={transition}
      />
      <motion.img
        src={itlImage}
        alt={''}
        animate={{ x: ['-2467px', 0] }}
        transition={transition}
      />
      <motion.img
        src={itlImage}
        alt={''}
        animate={{ x: ['-142px', '-3000px'] }}
        transition={transition}
      />
      <motion.img
        src={itlImage}
        alt={''}
        animate={{ x: ['-2467px', 0] }}
        transition={transition}
      />
    </div>
  );
};
