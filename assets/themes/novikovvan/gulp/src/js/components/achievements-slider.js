import MomentumSlider from "momentum-slider";

const achievementsSlider = document.querySelector(".achievements__slider");
const countSlides = Number(
  achievementsSlider.getAttribute("data-sliders-count") - 1
);
const achievementsItem = document.querySelector(".achievements__items");
const achievementsItemText = achievementsItem.querySelectorAll(
  ".sliders__item-text"
);
const achievementsItemImages = achievementsItem.querySelectorAll(
  ".achievements__item img"
);
const newAchievementsItemText = [];

achievementsItemText.forEach((text) => {
  newAchievementsItemText.push(text.textContent);
});

// Initializing the numbers slider
const msNumbers = new MomentumSlider({
  el: achievementsSlider,
  cssClass: "ms--numbers",
  range: [1, countSlides + 1],
  rangeContent: function (i) {
    return "0" + i;
  },
  style: {
    transform: [{ scale: [0.4, 1] }],
    opacity: [0, 1],
  },
  interactive: false,
});

// Initializing the titles slider
const titles = newAchievementsItemText;
const msTitles = new MomentumSlider({
  el: achievementsSlider,
  cssClass: "ms--titles",
  range: [0, countSlides],
  rangeContent: function (i) {
    return "<h3>" + titles[i] + "</h3>";
  },
  vertical: true,
  reverse: true,
  style: {
    opacity: [0, 1],
  },
  interactive: false,
});

// Get achievementsPagination items
const achievementsPagination = document.querySelector(
  ".achievements__pagination"
);
const achievementsPaginationItems = [].slice.call(
  achievementsPagination.children
);

// Initializing the images slider
const msImages = new MomentumSlider({
  el: achievementsItem,
  cssClass: "ms--images",
  range: [0, countSlides],
  rangeContent: function (i) {
    return `<div class="ms-slide__image-container";><div class="ms-slide__image" style="background-image: url('${achievementsItemImages[
      i
    ].getAttribute("src")}')"></div></div>`;
  },
  sync: [msNumbers, msTitles],
  style: {
    ".ms-slide__image": {
      transform: [{ scale: [1.5, 1] }],
    },
  },
  // Update achievementsPagination if slider change
  change: function (newIndex, oldIndex) {
    if (typeof oldIndex !== "undefined") {
      achievementsPaginationItems[oldIndex].classList.remove(
        "pagination__item--active"
      );
    }
    achievementsPaginationItems[newIndex].classList.add(
      "pagination__item--active"
    );
  },
});

// Select corresponding slider item when a achievementsPagination button is clicked
achievementsPagination.addEventListener("click", function (e) {
  if (e.target.matches(".pagination__button")) {
    const index = achievementsPaginationItems.indexOf(e.target.parentNode);
    msImages.select(index);
  }
});
