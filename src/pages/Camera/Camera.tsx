import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import frame from '@/shared/assets/images/frame.png';
import { TIMER } from '@/shared/consts';
import { CameraFeed, Loader, Timer } from '@/shared/ui';

import styles from './Camera.module.scss';

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      setIsLoading(true);
      videoRef.current?.pause();
      setShowTimer(false);
      const photo = await createPhoto();
      if (photo) {
        console.log(photo);
        navigate('/final');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
        isLoading={isLoading}
        title={'Пожалуйста, подождите'}
        subtitle={'Ваша фотография обрабатывается'}
      />
    </div>
  );
};
