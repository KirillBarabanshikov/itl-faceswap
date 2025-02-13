import { useNavigate } from 'react-router-dom';

import ReloadIcon from '@/shared/assets/icons/reload.svg?react';
import { Button } from '@/shared/ui';

import styles from './Final.module.scss';

export const Final = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.final}>
      <img
        src={'/bg2.png'}
        alt={''}
        width={2160}
        height={3840}
        className={styles.image}
      />
      <div className={styles.actions}>
        <Button onClick={() => navigate('/')}>На главную</Button>
        <Button variant={'outline'} onClick={() => navigate('/scene')}>
          <ReloadIcon /> Попробовать еще раз
        </Button>
        <Button>Сохранить фотографию</Button>
      </div>
    </div>
  );
};
