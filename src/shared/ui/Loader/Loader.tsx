import { motion } from 'framer-motion';
import { FC } from 'react';

import LoaderIcon from '@/shared/assets/icons/loader.svg?react';
import { Modal } from '@/shared/ui';

import styles from './Loader.module.scss';

interface ILoaderProps {
  isLoading: boolean;
  title: string;
  subtitle?: string;
}

export const Loader: FC<ILoaderProps> = ({ isLoading, title, subtitle }) => {
  return (
    <Modal isOpen={isLoading}>
      <div className={styles.body}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            repeatType: 'loop',
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
          }}
          className={styles.loader}
        >
          <LoaderIcon />
        </motion.div>
      </div>
    </Modal>
  );
};
