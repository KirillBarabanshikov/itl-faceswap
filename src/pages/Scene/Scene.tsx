import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchCostumes, fetchScenes } from '@/shared/api/queries.ts';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import { ICostume, IScene } from '@/shared/types';
import { BackgroundAnimation, Button, Slider } from '@/shared/ui';

import styles from './Scene.module.scss';

export const Scene = () => {
  const [slides, setSlides] = useState([]);
  const [selectedCostume, setSelectedCostume] = useState<ICostume>();
  const [selectedScene, setSelectedScene] = useState<IScene>();
  const [showScenes, setShowScenes] = useState(false);
  const navigate = useNavigate();

  const { data: costumes } = useQuery({
    queryKey: ['costumes'],
    queryFn: fetchCostumes,
  });

  const { data: scenes } = useQuery({
    queryKey: ['scenes'],
    queryFn: fetchScenes,
  });

  useEffect(() => {
    if (!costumes || !scenes) return;

    setSlides(costumes as never[]);
    setSelectedCostume(costumes.length ? costumes[0] : undefined);
    setSelectedScene(scenes.length ? scenes[0] : undefined);
  }, [costumes, scenes]);

  const handleSelect = (id: number) => {
    if (showScenes) {
      const scene = scenes?.find((scene) => scene.id === id);
      setSelectedScene(scene);
    } else {
      const costume = costumes?.find((costume) => costume.id === id);
      setSelectedCostume(costume);
    }
  };

  const handleNavigate = () => {
    if (showScenes) {
      navigate('/camera', {
        state: {
          costumeId: selectedCostume?.id,
          backgroundId: selectedScene?.id,
        },
      });
    } else {
      setShowScenes(true);
      setSlides(scenes as never[]);
    }
  };

  if (!costumes || !scenes) return <BackgroundAnimation />;

  return (
    <div
      className={styles.person}
      style={{
        backgroundImage: showScenes
          ? `url(${selectedScene?.image})`
          : 'initial',
      }}
    >
      <h1 className={styles.title}>{selectedCostume?.title}</h1>
      <img
        src={selectedCostume?.image}
        alt={''}
        width={1466}
        height={3348}
        className={styles.image}
      />
      <Slider
        slides={slides}
        selectedSlideId={showScenes ? selectedScene?.id : selectedCostume?.id}
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
      <BackgroundAnimation />
    </div>
  );
};
