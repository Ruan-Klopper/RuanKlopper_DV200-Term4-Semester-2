// components/HomeHeader.jsx
"use client";
import React, { useState, useEffect } from "react";
import "./HomeHeader.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import "swiper/css/bundle";

const DesktopHomeHeader = () => {
  const products = [
    {
      title: "Boost.Exfoliate",
      price: "R690.00",
      rating: "5.0 (20)",
      image: "/sampleImages/image.png",
    },
    {
      title: "Hydra.Nourish",
      price: "R850.00",
      rating: "4.8 (15)",
      image: "/sampleImages/image-2.png",
    },
    {
      title: "Radiance.Serum",
      price: "R1,200.00",
      rating: "4.9 (25)",
      image: "/sampleImages/image-3.png",
    },
  ];

  return (
    <div className="dHHbody">
      <div className="dHHContent">
        <h1>The Best Locally Produced South African Skin Care Products</h1>
        <h5>
          Welcome to .DotSkin, where personalized skincare meets proven science.
          We believe that your skin is as unique as you are, our products is
          locally produced and not imported
        </h5>
        <Link href="/products">
          <button className="fancyGreenButton">View Products</button>
        </Link>
      </div>
      <div className="dHHimage">
        <div className="dHHimageOverlay">
          <div className="dHHproductCarousel">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={2}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    cardType={"desktop"}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    image={product.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileHomeHeader = () => {
  const products = [
    {
      title: "Boost.Exfoliate",
      price: "R690.00",
      rating: "5.0 (20)",
      image: "/sampleImages/image.png",
    },
    {
      title: "Hydra.Nourish",
      price: "R850.00",
      rating: "4.8 (15)",
      image: "/sampleImages/image-2.png",
    },
    {
      title: "Radiance.Serum",
      price: "R1,200.00",
      rating: "4.9 (25)",
      image: "/sampleImages/image-3.png",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        <div className="mHHbodySl1">
          <div className="mHHContentSl1">
            <div>
              <h1>Your Journey to Radiant Skin, Begins Here</h1>
              <h5>
                Welcome to .DotSkin, where personalized skincare meets proven
                science. We believe that your skin is as unique as you are, and
                it deserves tailored care. Explore our curated range of products
                designed to bring out the best in your skin, no matter your type
                or concern.
              </h5>
            </div>
            <div>
              <Link href="/products">
                <button className="fancyGreenButton">View Products</button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="mHHbodySl2">
          <div className="mHHimageBody">
            <div className="mHHproductWrapper">
              <div className="mHHproductContainer">
                <Swiper
                  modules={[Navigation, Pagination, A11y, Autoplay]}
                  spaceBetween={25}
                  slidesPerView={3}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard
                        cardType={"mobile"}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        image={product.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default function HomeHeader() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 890);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <div>{isMobile ? <MobileHomeHeader /> : <DesktopHomeHeader />}</div>;
}
