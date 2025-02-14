import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchQr } from '@/shared/api/queries.ts';
import ReloadIcon from '@/shared/assets/icons/reload.svg?react';
// import { TG_BOT_CODE, TG_BOT_NAME } from '@/shared/consts';
import { Button, Modal } from '@/shared/ui';

import styles from './Final.module.scss';

export const Final = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, result } = location.state as { id: number; result: string };

  const { data: qr } = useQuery({
    queryKey: ['qr', id],
    queryFn: () => fetchQr(id),
  });

  // const { data: image } = useQuery({
  //   queryKey: ['image', id],
  //   queryFn: () => fetchImageResult(id),
  // });

  return (
    <div className={styles.final}>
      {result && (
        <img
          src={result}
          alt={''}
          width={2160}
          height={3840}
          className={styles.image}
        />
      )}
      <div className={styles.actions}>
        <Button onClick={() => navigate('/')}>На главную</Button>
        <Button variant={'outline'} onClick={() => navigate('/scene')}>
          <ReloadIcon /> Попробовать еще раз
        </Button>
        <Button onClick={() => setIsOpen(true)}>Сохранить фотографию</Button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modelInner}>
          <h2 className={styles.title}>сканируйте QR-код для получения фото</h2>
          <p className={styles.subtitle}>
            Сканируйте QR-код для получения фотографии.
          </p>
          {qr && (
            <div
              className={styles.qr}
              dangerouslySetInnerHTML={{ __html: qr }}
            />
          )}
          {/*{!showHint ? (*/}
          {/*  <div*/}
          {/*    onClick={() => setShowHint(true)}*/}
          {/*    className={styles.hintTrigger}*/}
          {/*  >*/}
          {/*    Не получается сканировать qr-код?*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className={styles.hint}>*/}
          {/*    Наберите в поиске <span>{TG_BOT_NAME}</span>, затем отправьте*/}
          {/*    сообщение “<span>{TG_BOT_CODE}</span>”, вам <span>ответит</span>{' '}*/}
          {/*    бот и <span>пришлет</span> вашу фотографию*/}
          {/*  </div>*/}
          {/*)}*/}
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </Modal>
    </div>
  );
};
