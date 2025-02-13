import clsx from 'clsx';
import { FC, RefObject, useEffect } from 'react';

import { DEVICE_ID } from '@/shared/consts';

import styles from './CameraFreed.module.scss';

interface ICameraFreedProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onReady: () => void;
  className?: string;
}

export const CameraFeed: FC<ICameraFreedProps> = ({
  videoRef,
  canvasRef,
  onReady,
  className,
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const videoHeight = 2160;
    const videoWidth = 3840;

    let animationFrameId: number;

    const drawToCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / video.videoWidth,
        canvas.height / video.videoHeight,
      );
      const x = (canvas.width - video.videoWidth * scale) / 2;
      const y = (canvas.height - video.videoHeight * scale) / 2;

      ctx.save();
      ctx.translate(canvas.width, 0); // Зеркальное отображение
      ctx.scale(-1, 1);
      ctx.drawImage(
        video,
        x,
        y,
        video.videoWidth * scale,
        video.videoHeight * scale,
      );
      ctx.restore();

      animationFrameId = requestAnimationFrame(drawToCanvas);
    };

    const handleStream = (stream: MediaStream) => {
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video
          .play()
          .then(() => {
            drawToCanvas();
            onReady();
          })
          .catch((err) => console.error('Error playing video:', err));
      };
    };

    navigator.mediaDevices
      ?.getUserMedia({
        video: {
          width: { ideal: videoWidth },
          height: { ideal: videoHeight },
          deviceId: DEVICE_ID,
        },
        audio: false,
      })
      .then(handleStream)
      .catch((err) => console.error('Error accessing camera:', err));

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video.srcObject) {
        (video.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={clsx(styles.cameraFreed, className)}>
      <canvas ref={canvasRef} width={2160} height={3840} />
      <video ref={videoRef} style={{ display: 'none' }} />
    </div>
  );
};
