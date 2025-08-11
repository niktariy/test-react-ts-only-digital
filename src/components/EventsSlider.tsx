import { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import YearInfo, { YearInfoProps } from './YearInfo';
import { FabButton } from './FabButton';
import ArrowLeftIcon from '../assets/icons/arrow-left-icon.svg';
import ArrowRightIcon from '../assets/icons/arrow-right-icon.svg';

import styled, { css } from 'styled-components';

import 'swiper/css';

const EventsSliderWrapper = styled.div`
  --slide-min-w: 166px;
  --slide-max-w: 255px;

  padding-inline: var(--content-padding);
  position: relative;
  margin-block-start: 3.375rem;

  @media screen and (width > 1200px) {
    --slide-min-w: 300px;
    --slide-max-w: 350px;
  }

  @media screen and (width > 1600px) {
    --slide-min-w: 320px;
    --slide-max-w: 400px;
  }

  .swiper {
    position: static;
  }

  [class*='swiper-button'] {
    background-color: rgb(var(--white));
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const StyledSlide = styled(SwiperSlide)`
  max-width: var(--slide-max-w);
`;

const StyledSliderButton = styled(FabButton)<{ $next?: boolean }>`
  --button-offset: calc(var(--content-padding) / 2);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  ${({ $next }) =>
    $next
      ? css`
          right: var(--button-offset);
          translate: 50% 0;
        `
      : css`
          left: var(--button-offset);
          translate: -50% 0;
        `}
`;

interface EventsSliderProps {
  events: YearInfoProps[];
}

const EventsSlider = ({ events }: EventsSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiper && typeof swiper.slideTo === 'function') {
      swiper.slideTo(0);
    }
  }, [events, swiper]);

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  return (
    <EventsSliderWrapper>
      {events.length === 0 ? (
        <p>Нет событий в этой категории</p>
      ) : (
        <Swiper
          breakpoints={{
            400: {
              slidesPerView: 1.5,
              spaceBetween: 25,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
            1600: {
              slidesPerView: 3.375,
              spaceBetween: 80,
            },
          }}
          modules={[Navigation, A11y]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(sw) => {
            setSwiper(sw);
            setIsBeginning(sw.isBeginning);
            setIsEnd(sw.isEnd);
          }}
          onSlideChange={(sw) => {
            setIsBeginning(sw.isBeginning);
            setIsEnd(sw.isEnd);
          }}
        >
          {events.map((event, idx) => (
            <StyledSlide key={event.year + idx}>
              <YearInfo year={event.year} description={event.description} />
            </StyledSlide>
          ))}
        </Swiper>
      )}

      {!isBeginning && (
        <StyledSliderButton size="small" icon={<ArrowLeftIcon />} onClick={handlePrev} />
      )}
      {!isEnd && (
        <StyledSliderButton
          $next={true}
          size="small"
          icon={<ArrowRightIcon />}
          onClick={handleNext}
        />
      )}
    </EventsSliderWrapper>
  );
};

export default EventsSlider;
