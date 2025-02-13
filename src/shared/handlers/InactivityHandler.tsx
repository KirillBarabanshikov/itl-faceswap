import { FC, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IInactivityHandlerProps {
  timeout: number;
}

const ignoredRoutes = ['/', '/camera'];

export const InactivityHandler: FC<IInactivityHandlerProps> = ({ timeout }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const resetTimer = () => {
    if (ignoredRoutes.includes(location.pathname)) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      navigate('/');
    }, timeout * 1000);
  };

  useEffect(() => {
    window.addEventListener('click', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('touch', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('touch', resetTimer);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  return <></>;
};
