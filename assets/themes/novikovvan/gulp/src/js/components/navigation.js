"use strict";

let contentBlocks = [];
let common_link = "";
let base_link = "";

const anchorLinks = (id) => {
  const point = document.querySelector(id);
  if (!point) return;
  point.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const getHash = (p) => {
  const pathname = p.split("/");

  if (pathname.length === 2) {
    const id = pathname[1];
    if (id) anchorLinks("#" + id);
    return;
  } else if (pathname.length === 4) {
    const id = pathname[3];
    if (id) anchorLinks("#" + id);
    return;
  }

  if (pathname.length < 3) return;
  if (pathname[2].length == 0) return;
  const id = pathname[2];
  anchorLinks("#" + id);
};

function debounce(func, ms) {
  let timer;
  return function wrapper() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      func();
    }, ms);
  };
}

const getSectionInViewportKey = (nodes) => {
  const top_blocks_height = 137;
  let next_section_in_view_port = null;
  let min_section_top_from_viewport = 120;

  if (window.scrollY <= 200) {
    document.querySelectorAll(`.navigation__item`).forEach((i) => {
      i.classList.remove("active");
    });
    return "break";
  }

  nodes.forEach((section) => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom - top_blocks_height < 5) return;

    if (rect.top < min_section_top_from_viewport) {
      min_section_top_from_viewport = rect.top;
      next_section_in_view_port = section.id;
    }
  });
  return next_section_in_view_port;
};

let active_section = "";
const focusContent = debounce(() => {
  let id = getSectionInViewportKey(contentBlocks);
  let link = `${common_link}/`;

  if (id && id.length > 0) {
    if (id === "break") id = "";

    if (id) {
      link += `${id}/`;
    } else {
      active_section = "";
    }

    if (active_section !== link) {
      if (
        id &&
        document.querySelectorAll(`.navigation__item[href="#${id}"]`).length > 0
      ) {
        document.querySelectorAll(`.navigation__item`).forEach((i) => {
          i.classList.remove("active");
        });
        document
          .querySelectorAll(`.navigation__item[href="#${id}"]`)
          .forEach((i) => i.classList.add("active"));
      }

      active_section = link;
    }
  }
}, 50);
window.addEventListener("load", function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.currentTarget.getAttribute("href");
      anchorLinks(id);
      document.querySelectorAll('a[href^="#"]').forEach((item) => {
        item.classList.remove("active");
      });
      link.classList.add("active");
    });
  });

  contentBlocks = document.querySelectorAll("section");
  this.document.addEventListener("scroll", focusContent);
});
