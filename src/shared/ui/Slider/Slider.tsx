// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Slider.module.scss';

interface ISliderProps {
  slides: {
    id: number;
    title: string;
    img: string;
  }[];
  selectedSlideId?: number;
  onSelect: (id: number) => void;
}

export const Slider: FC<ISliderProps> = ({
  slides,
  selectedSlideId,
  onSelect,
}) => {
  return (
    <div>
      <Swiper
        spaceBetween={32}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              onClick={() => onSelect(slide.id)}
              className={clsx(
                styles.slide,
                selectedSlideId == slide.id && styles.selected,
              )}
            >
              <div className={styles.title}>{slide.title}</div>
              <img src={slide.img} alt={''} className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
