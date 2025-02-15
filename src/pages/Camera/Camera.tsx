import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { sendImageResult } from '@/shared/api/queries.ts';
import ReloadIcon from '@/shared/assets/icons/reload.svg?react';
import frame from '@/shared/assets/images/frame.png';
import { TIMER } from '@/shared/consts';
import { AlertModal, Button, CameraFeed, Loader, Timer } from '@/shared/ui';

import styles from './Camera.module.scss';

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [modalState, setModalState] = useState<'loading' | 'error' | null>(
    null,
  );
  const navigate = useNavigate();
  const location = useLocation();

  const { costumeId, backgroundId } = location.state as {
    costumeId: number;
    backgroundId: number;
  };

  const createPhoto = (): Promise<File | undefined> => {
    const canvas = canvasRef.current;
    if (!canvas) return Promise.resolve(undefined);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const timerId = setTimeout(() => {
            const photo = new File([blob], 'photo.png', { type: 'image/png' });
            clearTimeout(timerId);
            resolve(photo);
          }, 200);
        } else {
          console.error('Failed to create blob from canvas.');
          resolve(undefined);
        }
      }, 'image/png');
    });
  };

  const handleTimerEnd = async () => {
    try {
      setModalState('loading');
      videoRef.current?.pause();
      setShowTimer(false);
      const userImage = await createPhoto();
      if (userImage) {
        const { id } = await sendImageResult({
          userImage,
          costumeId,
          backgroundId,
        });
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target!.result;
          setModalState(null);
          navigate('/final', { state: { id, result } });
        };
        reader.readAsDataURL(userImage);
      }
    } catch (error) {
      console.error(error);
      setModalState('error');
    }
  };

  return (
    <div className={styles.camera}>
      {showTimer && (
        <>
          <h1 className={styles.title}>
            Поместите лицо <br />в область
          </h1>
          <img
            src={frame}
            alt={''}
            width={825}
            height={825}
            className={styles.frame}
          />
        </>
      )}
      <CameraFeed
        videoRef={videoRef}
        canvasRef={canvasRef}
        onReady={() => setShowTimer(true)}
      />
      {showTimer && (
        <Timer time={TIMER} onEnd={handleTimerEnd} className={styles.timer} />
      )}
      <Loader
        isLoading={modalState === 'loading'}
        title={'Пожалуйста, подождите'}
        subtitle={'Ваша фотография обрабатывается'}
      />
      <AlertModal
        isOpen={modalState === 'error'}
        title={'Ошибка'}
        subtitle={'Лицо не распознано. Попробуйте еще раз.'}
        actions={
          <>
            <Button
              onClick={() => {
                setModalState(null);
                navigate('/');
              }}
            >
              На главную
            </Button>
            <Button
              variant={'outline'}
              onClick={() => {
                setModalState(null);
                navigate('/scene');
              }}
            >
              <ReloadIcon />
              Попробовать еще раз
            </Button>
          </>
        }
      />
    </div>
  );
};
