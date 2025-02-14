import hand from '@/shared/assets/images/hand.png';
import logo from '@/shared/assets/images/logo.svg';
import persons from '@/shared/assets/images/persons.png';
import { BackgroundAnimation } from '@/shared/ui';

import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.home}>
      <img
        src={logo}
        alt={''}
        width={1200}
        height={264}
        className={styles.logo}
      />
      <h1 className={styles.title}>Примерь свадебный наряд</h1>
      <img
        src={persons}
        alt={''}
        width={2253}
        height={2240}
        className={styles.persons}
      />
      <div className={styles.hint}>
        <div className={styles.hintText}>Скачать</div>
        <img
          src={hand}
          alt={''}
          width={333}
          height={400}
          className={styles.hintImage}
        />
      </div>
      <BackgroundAnimation />
    </div>
  );
};
