// components/Carousel/HomeRange.jsx
"use client";
import React from "react";
import "./HomeHeader.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import "swiper/css/bundle";
import "../../app/global.css";
import "../../app/home.css";
import { Container, Row, Col } from "react-bootstrap";

const HomeCategoryCard = ({ text, image, colour }) => {
  return (
    <div>
      <Link href="/products" style={{ textDecoration: "none" }}>
        <div className="hcCardBody" style={{ backgroundColor: `${colour}` }}>
          <div className="hrcBGtext">{text}</div>
          <div className="hrcImageWrapper">
            <div
              className="hrcImage"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function HomeRange() {
  return (
    <div className="HomeRangeContainerInside">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]} // Added EffectCoverflow
        spaceBetween={20}
        slidesPerView={5}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        loop={true}
      >
        <SwiperSlide>
          <HomeCategoryCard
            text={"Cleansers"}
            image={"/sampleImages/image.png"}
            colour={"#E7E5D1"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HomeCategoryCard
            text={"Moisturizers"}
            image={"/sampleImages/image-1.png"}
            colour={"#E4CD9F"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HomeCategoryCard
            text={"Serums"}
            image={"/sampleImages/image.png"}
            colour={"#E4CEBC"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HomeCategoryCard
            text={"Sun Protection"}
            image={"/sampleImages/image.png"}
            colour={"#DDD0C3"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HomeCategoryCard
            text={"Acne care"}
            image={"/sampleImages/image.png"}
            colour={"#E4CEBC"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HomeCategoryCard
            text={"Cleansers"}
            image={"/sampleImages/image.png"}
            colour={"#E7E5D1"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
