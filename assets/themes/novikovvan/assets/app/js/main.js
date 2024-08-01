/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_remove_preload_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/remove-preload.js */ "./src/js/components/remove-preload.js");
/* harmony import */ var _components_count_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/count.js */ "./src/js/components/count.js");



/***/ }),

/***/ "./src/js/components/count.js":
/*!************************************!*\
  !*** ./src/js/components/count.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const countBlock = document.querySelector(".count-block");
if (countBlock) {
  const counts = document.querySelectorAll(".count span");
  const speed = 200;
  counts.forEach(counter => {
    function upDate() {
      const target = Number(counter.parentElement.getAttribute("data-target"));
      const count = Number(counter.textContent);
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(inc + count);
        if (target < 5) {
          setTimeout(upDate, 300);
        } else if (target < 20) {
          setTimeout(upDate, 120);
        } else {
          setTimeout(upDate, 3);
        }
      } else {
        counter.innerText = target;
      }
    }
    visibleSection(upDate);
  });
  function visibleSection(func) {
    const optionsBottles = {
      threshold: 0.1
    };
    const observerBottles = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          func();
        } else {
          resetCount();
        }
      });
    }, optionsBottles);
    observerBottles.observe(countBlock);
  }
  function resetCount() {
    counts.forEach(counter => {
      counter.textContent = 0;
    });
  }
}

/***/ }),

/***/ "./src/js/components/remove-preload.js":
/*!*********************************************!*\
  !*** ./src/js/components/remove-preload.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

/******/ })()
;
//# sourceMappingURL=main.js.map