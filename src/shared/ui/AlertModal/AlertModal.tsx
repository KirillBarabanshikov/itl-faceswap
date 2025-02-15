import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import errorIcon from '@/shared/assets/icons/error.svg';
import { Modal } from '@/shared/ui';

import styles from './AlertModal.module.scss';

interface IAlertModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  subtitle: string;
  actions: ReactNode;
}

export const AlertModal: FC<IAlertModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  actions,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalBody}>
        <img
          src={errorIcon}
          alt={''}
          width={128}
          height={128}
          className={styles.errorIcon}
        />
        <h2 className={styles.title}>{title}</h2>
        <p className={clsx(styles.subtitle)}>{subtitle}</p>
        <div className={styles.buttons}>{actions}</div>
      </div>
    </Modal>
  );
};
