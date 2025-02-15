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

    const handleStream = (stream: MediaStream) => {
      if (!video) return;

      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video
          .play()
          .then(() => {
            canvas.width = video.videoHeight;
            canvas.height = video.videoWidth;

            const drawToCanvas = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.save();
              ctx.translate(canvas.width, 0);
              ctx.rotate(Math.PI / 2);
              ctx.scale(-1, 1);
              ctx.drawImage(
                video,
                -video.videoWidth,
                0,
                video.videoWidth,
                video.videoHeight,
              );
              ctx.restore();
              requestAnimationFrame(drawToCanvas);
            };

            drawToCanvas();
            onReady();
          })
          .catch((err) => console.error('Error playing video:', err));
      };
    };

    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          deviceId: DEVICE_ID,
        },
        audio: false,
      })
      .then(handleStream)
      .catch((err) => console.error('Error accessing camera:', err));

    return () => {
      if (video?.srcObject) {
        (video.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={clsx(styles.cameraFreed, className)}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          outline: '1px solid red',
        }}
      />
      <video ref={videoRef} style={{ display: 'none' }} />
    </div>
  );
};
