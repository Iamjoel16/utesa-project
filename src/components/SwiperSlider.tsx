import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './SwiperSlider.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Header.css';

const SwiperSlider: React.FC = () => {
  const images = [
    '/public/images/utesa1.jpg',
    '/public/images/utesa2.jpg',
    '/public/images/utesa3.jpg',
    '/public/images/utesa4.jpg',
  ];

  return (
    <div className="swiper-slider-container content">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="swiper-slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
