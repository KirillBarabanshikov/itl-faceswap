import { useNavigate } from 'react-router-dom';

import hand from '@/shared/assets/images/hand.png';
import logo from '@/shared/assets/images/logo.svg';
import persons from '@/shared/assets/images/persons.png';

import styles from './Home.module.scss';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home} onClick={() => navigate('/scene')}>
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
        <div className={styles.hintText}>Коснитесь экрана</div>
        <img
          src={hand}
          alt={''}
          width={333}
          height={400}
          className={styles.hintImage}
        />
      </div>
    </div>
  );
};
