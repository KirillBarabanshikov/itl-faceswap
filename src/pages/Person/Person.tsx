import { useState } from 'react';

import img from '@/shared/assets/images/persons.png';
import { Slider } from '@/shared/ui';

import styles from './Person.module.scss';

const slides = [
  { id: 1, title: 'Лёня Карп', img: img },
  { id: 2, title: 'Невеста 1', img: img },
  { id: 3, title: 'Невеста 2', img: img },
  { id: 4, title: 'Невеста 3', img: img },
];

export const Person = () => {
  const [selectedPerson, setSelectedPerson] = useState<number>();

  return (
    <div className={styles.person}>
      <h1>Лёня Карп</h1>
      {/*<img src={''} alt={''} width={1466} height={3348} />*/}
      <Slider
        slides={slides}
        selectedSlideId={selectedPerson}
        onSelect={(id) => setSelectedPerson(id)}
      />
    </div>
  );
};
