import Swiper from "swiper";
import { Keyboard, Pagination } from "swiper/modules";

Swiper.use(Pagination, Keyboard);

// reviews
const mainSliders = document.querySelectorAll(".main-slider");
mainSliders.forEach((slider) => {
  const initSlider = slider.querySelectorAll(".main-slider__items");

  initSlider.forEach((slider) => {
    const mainSlider = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 20,
      slidesPerGroup: 1,
      speed: 700,
      loop: true,

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      pagination: {
        el: ".reviews__tabs-btns",
        clickable: true,
        dynamicBullets: false,
      },
    });
  });
});

// look
const lookProgram = new Swiper(".look__program-slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  slidesPerGroup: 1,
  speed: 1000,
  loop: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: ".look__program-btns",
    clickable: true,
    dynamicBullets: false,
  },
});

// programs
const programs = new Swiper(".program-list__cards", {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 1,
  speed: 1000,
  loop: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: ".program-list__cards-btns",
    clickable: true,
    dynamicBullets: false,
  },
});
