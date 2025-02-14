import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { fetchImageResult } from '@/shared/api/queries.ts';
import hand from '@/shared/assets/images/hand.png';
import logo from '@/shared/assets/images/logo.svg';
import persons from '@/shared/assets/images/persons.png';
import { API_URL } from '@/shared/consts';
import { BackgroundAnimation } from '@/shared/ui';

import styles from './Home.module.scss';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: image } = useQuery({
    queryKey: ['userImage', id],
    queryFn: () => fetchImageResult(id ? +id : 0),
    enabled: !!id,
  });

  const download = () => {
    if (!image) return;

    const link = document.createElement('a');
    link.href = API_URL + `/download/${image.id}`;
    link.setAttribute('download', '');
    link.click();
  };

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
      {image && (
        <div className={styles.hint} onClick={download}>
          <div className={styles.hintText}>Скачать</div>
          <img
            src={hand}
            alt={''}
            width={333}
            height={400}
            className={styles.hintImage}
          />
        </div>
      )}
      <BackgroundAnimation />
    </div>
  );
};
