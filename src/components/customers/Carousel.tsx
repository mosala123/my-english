'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
import { GoCheck } from "react-icons/go";
import { FaStar } from "react-icons/fa";

const Carousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex K.",
      rating: 5,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
    {
      id: 4,
      name: "Emily R.",
      rating: 5,
      text: "The customer service at Shop.co is exceptional! They helped me find the perfect outfit for my event and the quality was outstanding."
    },
    {
      id: 5,
      name: "Mike T.",
      rating: 5,
      text: "Fast shipping and great quality! I've ordered multiple times and always been satisfied with my purchases."
    },
    {
      id: 6,
      name: "Jessica P.",
      rating: 5,
      text: "Love the variety and quality of products. Shop.co has become my go-to for online shopping!"
    }
  ];

  return (
    <div className="testimonials-section">
      <div className="section-header">
        <h2 className="testimonials-title">OUR HAPPY CUSTOMERS</h2>
        <div className="navigation-buttons">
          <div className="nav-button prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="nav-button next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.nav-button.next',
          prevEl: '.nav-button.prev',
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination'
        }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="star-icon" />
                ))}
              </div>
              <div className="customer-info">
                <span className="customer-name">
                  {testimonial.name}
                  <span className="verified-badge">
                    <GoCheck /> 
                  </span> 
                </span>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination"></div>
    </div>
  );
};

export default Carousel;