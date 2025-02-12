// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css';

import clsx from 'clsx';
import { FC, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowLeft from '@/shared/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/shared/assets/icons/arrow_right.svg?react';

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
  const [swiper, setSwiper] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.slider}>
      <button
        onClick={() => swiper?.slidePrev()}
        disabled={activeIndex === 0}
        className={clsx(styles.btn, styles.prev)}
      >
        <ArrowLeft />
      </button>

      <Swiper
        spaceBetween={32}
        slidesPerView={3}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
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
              <img src={slide.img} alt={slide.title} className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiper?.slideNext()}
        disabled={activeIndex === slides.length - 3}
        className={clsx(styles.btn, styles.next)}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
