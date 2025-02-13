import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Arrow from '@/shared/assets/icons/arrow.svg?react';
import { Button, Slider } from '@/shared/ui';

import styles from './Scene.module.scss';

const costumes = [
  { id: 1, title: 'Лёня Карп', img: '/img.png' },
  { id: 2, title: 'Невеста 1', img: '/img.png' },
  { id: 3, title: 'Невеста 2', img: '/img.png' },
  { id: 4, title: 'Невеста 3', img: '/img.png' },
];

const scenes = [
  { id: 1, img: '/bg.png' },
  { id: 2, img: '/bg.png' },
  { id: 3, img: '/bg.png' },
  { id: 4, img: '/bg.png' },
];

export const Scene = () => {
  const [slides, setSlides] = useState([]);
  const [selectedCostume, setSelectedCostume] = useState<number>();
  const [selectedScene, setSelectedScene] = useState<number>();
  const [showScenes, setShowScenes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSlides(costumes as never[]);
  }, []);

  const handleSelect = (id: number) => {
    if (showScenes) {
      setSelectedScene(id);
    } else {
      setSelectedCostume(id);
    }
  };

  const handleNavigate = () => {
    if (showScenes) {
      navigate('/camera');
    } else {
      setShowScenes(true);
      setSlides(scenes as never[]);
    }
  };

  return (
    <div
      className={styles.person}
      style={{ backgroundImage: showScenes ? 'url(/bg.png)' : 'initial' }}
    >
      <h1 className={styles.title}>Лёня Карп</h1>
      <img
        src={'/img.png'}
        alt={''}
        width={1466}
        height={3348}
        className={styles.image}
      />
      <Slider
        slides={slides}
        selectedSlideId={showScenes ? selectedScene : selectedCostume}
        onSelect={(id) => handleSelect(id)}
        title={showScenes ? 'Фоновое изображение' : 'Персонажи'}
        actionSlot={
          <>
            <span>
              {showScenes ? 'Сделать фотографию' : 'Перейти к выбору фона'}{' '}
              <Arrow />
            </span>
            <Button onClick={handleNavigate}>
              {showScenes ? 'Сфотографировать' : 'Продолжить'}
            </Button>
          </>
        }
        coverImages={showScenes}
        className={styles.slider}
      />
    </div>
  );
};
