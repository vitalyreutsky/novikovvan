/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/momentum-slider/dist/momentum-slider.js":
/*!**************************************************************!*\
  !*** ./node_modules/momentum-slider/dist/momentum-slider.js ***!
  \**************************************************************/
/***/ (function(module) {

/* eslint-disable */
(function (global, factory) {
     true ? module.exports = factory() :
        0;
}(this, (function () {
    'use strict';
    /* eslint-enable */

    // fixes weird safari 10 bug where preventDefault is prevented
    // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
    window.addEventListener('touchmove', function () {});

    function MomentumSlider(options) {
        this.o = extend({}, this.defaults, options);
        this.initHtml();
        this.initValues();
        this.initEvents();
        this.updateClassnames();
    }

    MomentumSlider.prototype = {
        defaults: {
            el: '.ms-container',
            cssClass: '',
            vertical: false,
            multiplier: 1,
            bounceCoefficient: 0.3,
            bounceMax: 100,
            loop: 0,
            interactive: true,
            reverse: false,
            currentIndex: 0
        },
        initHtml: function () {
            this.msContainer = is.str(this.o.el) ? document.querySelector(this.o.el) : this.o.el;
            if (this.o.range) {
                var html = '<div class="ms-container ' + this.o.cssClass + '"><ul class="ms-track">';
                for (var i = this.o.range[0]; i <= this.o.range[1]; i++) {
                    html += is.fnc(this.o.rangeContent) ? buildSlide(this.o.rangeContent(i)) : buildSlide(i);
                }
                html += '</ul></div>';
                var msHtml = document.createElement('div');
                msHtml.innerHTML = html;
                this.msContainer.appendChild(msHtml.firstChild);
                this.msContainer = this.msContainer.lastChild;
            }
            this.msContainer.classList.add('ms-container--' + (this.o.vertical ? 'vertical' : 'horizontal'));
            if (this.o.reverse) {
                this.msContainer.classList.add('ms-container--reverse');
            }
            this.msTrack = this.msContainer.children[0];
            this.msSlides = this.msTrack.children;
            this.step = this.o.vertical ? this.msSlides[0].scrollHeight : this.msSlides[0].scrollWidth;
            this.sliderLength = this.msSlides.length;
            if (this.o.loop) {
                var loopLength, slideIndex, fragment;
                // begin
                fragment = document.createDocumentFragment();
                loopLength = this.o.loop;
                slideIndex = this.sliderLength - loopLength;
                while (loopLength--) {
                    fragment.appendChild(this.msSlides[slideIndex++].cloneNode(true));
                }
                this.msTrack.insertBefore(fragment, this.msTrack.firstChild);
                // end
                fragment = document.createDocumentFragment();
                slideIndex = loopLength = this.o.loop;
                while (loopLength--) {
                    fragment.appendChild(this.msSlides[slideIndex++].cloneNode(true));
                }
                this.msTrack.appendChild(fragment);
                // update
                this.sliderLength += this.o.loop * 2;
            }
            this.sliderWidth = this.sliderLength * this.step;
        },
        initValues: function () {
            this.boundMin = this.o.reverse ? 0 : -this.step * (this.sliderLength - 1);
            this.boundMax = this.o.reverse ? this.step * (this.sliderLength - 1) : 0;
            this.targetPosition = this.targetPosition || 0;
            this.ticking = false;
            this.enabled = true;
            this.pointerActive = false;
            this.pointerMoved = false;
            this.trackingPoints = [];
            this.msTrack.style[this.o.vertical ? 'height' : 'width'] = this.sliderWidth + 'px';
            this.currentIndex = (this.currentIndex || this.o.currentIndex) + this.o.loop;
            this.updateSlider(undefined, true);
            this.renderTarget();
            var index = this.sliderLength;
            while (index--) {
                this.setStyle(index, this.currentIndex == index ? 0 : -1);
            }
        },
        initEvents: function () {
            if (this.o.interactive) {
                this.msContainer.addEventListener('touchstart', this.onDown.bind(this));
                this.msContainer.addEventListener('mousedown', this.onDown.bind(this));
                document.addEventListener('touchmove', this.onMove.bind(this), getPassiveSupported() ? {
                    passive: false
                } : false);
                document.addEventListener('touchend', this.onUp.bind(this));
                document.addEventListener('touchcancel', this.stopTracking.bind(this));
                document.addEventListener('mousemove', this.onMove.bind(this), getPassiveSupported() ? {
                    passive: false
                } : false);
                document.addEventListener('mouseup', this.onUp.bind(this));
                if (this.o.prevEl) {
                    this.prevEl = is.str(this.o.prevEl) ? document.querySelector(this.o.prevEl) : this.o.prevEl;
                    this.prevEl.addEventListener('click', this.prev.bind(this));
                }
                if (this.o.nextEl) {
                    this.nextEl = is.str(this.o.nextEl) ? document.querySelector(this.o.nextEl) : this.o.nextEl;
                    this.nextEl.addEventListener('click', this.next.bind(this));
                }
            }
            window.addEventListener('resize', this.onResize.bind(this));
        },
        prev: function () {
            if (this.enabled) {
                this.updateSlider(Math.round(this.targetPosition / this.step) * this.step + (this.o.reverse ? -this.step : this.step));
            }
        },
        next: function () {
            if (this.enabled) {
                this.updateSlider(Math.round(this.targetPosition / this.step) * this.step + (this.o.reverse ? this.step : -this.step));
            }
        },
        select: function (index) {
            if (this.enabled) {
                // this.currentIndex = index;
                // this.updateSlider();
                this.updateSlider((index + this.o.loop) * (this.o.reverse ? this.step : -this.step));
            }
        },
        setStyleToNode: function (node, style, diff, lower) {
            if (style) {
                var value = '';
                for (var property in style) {
                    if (property[0] == '.') {
                        this.setStyleToNode(node.querySelector(property), style[property], diff, lower);
                    } else if (property == 'transform') {
                        style[property].forEach(function(transform) {
                            for (var t in transform) {
                                value += t + '(' + getCurrentValue(transform[t], diff, lower);
                                if (t == 'rotate') {
                                    value += 'deg';
                                } else if (t == 'translateX' || t == 'translateY' || t == 'translateZ') {
                                    value += 'px';
                                }
                                value += ') ';
                            }
                        });
                    } else {
                        value = getCurrentValue(style[property], diff, lower);
                    }
                    node.style[property] = value;
                }
            }
        },
        setStyle: function (index, diff, lower) {
            this.setStyleToNode(this.msSlides[index], this.o.style, diff, lower);
            if (is.fnc(this.o.customStyles)) {
                this.o.customStyles(index, diff, lower);
            }
        },
        renderTarget: function () {
            if (this.o.sync) {
                var syncIndex = this.o.sync.length;
                var syncSlider;
                while (syncIndex--) {
                    syncSlider = this.o.sync[syncIndex];
                    syncSlider.targetPosition = (syncSlider.o.reverse ? -1 : 1) * this.targetPosition / this.sliderWidth * syncSlider.sliderWidth;
                    syncSlider.renderTarget();
                }
            }

            var paddingLength = this.o.loop * this.step;
            var contentLength = this.sliderWidth - (paddingLength * 2);
            if (this.o.loop) {
                if (-this.targetPosition < paddingLength) {
                    while (-this.targetPosition < paddingLength) {
                        this.targetPosition -= contentLength;
                    }
                } else if (-this.targetPosition >= paddingLength + contentLength) {
                    while (-this.targetPosition >= paddingLength + contentLength) {
                        this.targetPosition += contentLength;
                    }
                }
            }

            // var actualIndex = -this.targetPosition / this.step;
            var actualIndex = (this.o.reverse ? 1 : -1) * this.targetPosition / this.step;
            this.onChangeCurrentIndex(Math.round(actualIndex));
            var lowerIndex = Math.floor(actualIndex);
            var higherIndex = Math.ceil(actualIndex);
            var lowerDiff = actualIndex - lowerIndex;
            var higherDiff = actualIndex - higherIndex;

            if (!is.und(this.lowerIndex) && this.lowerIndex != lowerIndex && this.lowerIndex != higherIndex) {
                this.setStyle(this.lowerIndex, 1, true);
            }
            if (!is.und(this.higherIndex) && this.higherIndex != lowerIndex && this.higherIndex != higherIndex) {
                this.setStyle(this.higherIndex, -1);
            }

            if (lowerIndex >= 0 && lowerIndex < this.sliderLength) {
                this.setStyle(lowerIndex, lowerDiff, true);
                this.lowerIndex = lowerIndex;
            }
            if (higherIndex >= 0 && higherIndex < this.sliderLength) {
                this.setStyle(higherIndex, higherDiff);
                this.higherIndex = higherIndex;
            }

            var transformValue = 'translate' + (this.o.vertical ? 'Y' : 'X') + '(' + this.targetPosition + 'px)';
            this.msTrack.style[transformProperty] = transformValue;
        },
        onDown: function (ev) {
            if (this.enabled && !this.pointerActive) {
                var event = normalizeEvent(ev);
                this.pointerActive = true;
                this.pointerId = event.id;

                this.pointerLastX = this.pointerCurrentX = event.x;
                this.pointerLastY = this.pointerCurrentY = event.y;
                this.trackingPoints = [];
                this.addTrackingPoint(this.pointerLastX, this.pointerLastY);

                if (this.animateInstance) this.animateInstance.stop();
            }
        },
        onMove: function (ev) {
            if (this.enabled && this.pointerActive) {
                var event = normalizeEvent(ev);

                if (event.id === this.pointerId) {
                    this.pointerCurrentX = event.x;
                    this.pointerCurrentY = event.y;
                    
                    var shouldMoveSlider = this.pointerMoved
                    if (!this.pointerMoved) {
                        var movingVertically =
                            Math.abs(Math.abs(this.pointerCurrentX) - Math.abs(this.pointerLastX)) <
                            Math.abs(Math.abs(this.pointerCurrentY) - Math.abs(this.pointerLastY))
                        if (
                            (this.o.vertical && movingVertically) ||
                            (!this.o.vertical && !movingVertically)
                        ) {
                            shouldMoveSlider = true
                        }
                    }

                    if (shouldMoveSlider) {
                        ev.preventDefault();
                        this.pointerMoved = true;
                        this.addTrackingPoint(this.pointerLastX, this.pointerLastY);
                        this.requestTick();
                    } else {
                        this.stopTracking(-1);
                    }
                }
            }
        },
        onUp: function (ev) {
            if (this.enabled && this.pointerActive) {
                var event = normalizeEvent(ev);

                if (event.id === this.pointerId) {
                    var slide = ev.target;
                    if (this.msTrack.contains(slide)) {
                        while (!slide.matches('.ms-slide, .ms-track')) {
                            slide = slide.parentNode;
                        }
                    }
                    var index = Array.prototype.indexOf.call(this.msSlides, slide);
                    if (!this.pointerMoved) {
                        if (index !== -1) {
                            this.currentIndex = index;
                            this.updateSlider();
                        }
                    }
                    this.stopTracking(index);
                }
            }
        },
        onResize: function () {
            // this.initValues();
        },
        stopTracking: function (index) {
            this.pointerActive = false;
            if (this.pointerMoved || index === -1) {
                this.pointerMoved = false;
                this.addTrackingPoint(this.pointerLastX, this.pointerLastY);
                this.startDecelAnim();
            }
        },
        addTrackingPoint: function (x, y) {
            var time = Date.now();
            while (this.trackingPoints.length > 0) {
                if (time - this.trackingPoints[0].time <= 100) {
                    break;
                }
                this.trackingPoints.shift();
            }

            this.trackingPoints.push({
                x: x,
                y: y,
                time: time
            });
        },
        updateAndRender: function () {
            var pointerChange = this.o.vertical ? this.pointerCurrentY - this.pointerLastY : this.pointerCurrentX - this.pointerLastX;
            this.targetPosition += pointerChange * this.o.multiplier;

            if (this.o.bounceCoefficient) {
                var diff = this.checkBounds();
                if (diff !== 0) {
                    this.targetPosition -= pointerChange * dragOutOfBoundsMultiplier(diff) * this.o.multiplier;
                }
            } else {
                this.checkBounds(true);
            }

            this.renderTarget();

            this.pointerLastX = this.pointerCurrentX;
            this.pointerLastY = this.pointerCurrentY;
            this.ticking = false;
        },
        requestTick: function () {
            if (!this.ticking) {
                requestAnimationFrame(this.updateAndRender.bind(this));
            }
            this.ticking = true;
        },
        checkBounds: function (restrict) {
            var diff = 0;

            if (this.boundMin !== undefined && this.targetPosition < this.boundMin) {
                diff = this.boundMin - this.targetPosition;
            } else if (this.boundMax !== undefined && this.targetPosition > this.boundMax) {
                diff = this.boundMax - this.targetPosition;
            }

            if (restrict) {
                if (diff !== 0) {
                    this.targetPosition = diff > 0 ? this.boundMin : this.boundMax;
                }
            }

            return diff;
        },
        startDecelAnim: function () {
            var firstPoint = this.trackingPoints[0];
            var lastPoint = this.trackingPoints[this.trackingPoints.length - 1];

            var positionOffset = this.o.vertical ? lastPoint.y - firstPoint.y : lastPoint.x - firstPoint.x;
            var timeOffset = lastPoint.time - firstPoint.time;

            var D = timeOffset / 15 / this.o.multiplier;
            this.decVel = positionOffset / D || 0;

            var newTargetPosition = this.targetPosition + (this.decVel * 12);
            var newTargetPositionOffset = newTargetPosition % this.step;
            newTargetPosition = newTargetPosition - newTargetPositionOffset;
            if (Math.abs(newTargetPositionOffset) > this.step / 2) {
                newTargetPosition += (newTargetPositionOffset > 0 ? 1 : -1) * this.step;
            }

            this.updateSlider(newTargetPosition);
        },
        fixCurrentIndex: function () {
            if (this.o.loop) {
                if (this.currentIndex < this.o.loop) {
                    this.currentIndex = this.sliderLength - this.o.loop + (this.currentIndex - this.o.loop);
                } else if (this.currentIndex > this.sliderLength - this.o.loop - 1) {
                    this.currentIndex = this.currentIndex + this.o.loop * 2 - this.sliderLength;
                }
            }
        },
        updateSlider: function (newTargetPosition, initial) {
            if (is.und(newTargetPosition)) {
                newTargetPosition = (this.o.reverse ? 1 : -1) * this.currentIndex * this.step;
            } else {
                this.currentIndex = (this.o.reverse ? 1 : -1) * newTargetPosition / this.step;
            }
            this.fixCurrentIndex();
            if (newTargetPosition !== this.targetPosition) {
                this.updateClassnames();
                this.animateTarget(newTargetPosition, initial);
            }
        },
        updateClassnames: function () {
            if (this.prevEl) {
                if (this.currentIndex === 0) {
                    this.prevEl.classList.add('ms-first');
                } else {
                    this.prevEl.classList.remove('ms-first');
                }
            }
            if (this.nextEl) {
                if (this.currentIndex === this.sliderLength - 1) {
                    this.nextEl.classList.add('ms-last');
                } else {
                    this.nextEl.classList.remove('ms-last');
                }
            }
        },
        animateTarget: function (newTargetPosition, initial, back) {
            if (this.animateInstance) this.animateInstance.stop();
            var _ = this;
            var from = this.targetPosition;
            var to = newTargetPosition;
            this.animateInstance = animate(function(progress) {
                _.targetPosition = to > from ? from + ((to - from) * progress) : from - ((from - to) * progress); // 0 - ((0 - -2100) * progress)
                var sliderMin = _.o.reverse ? 0 : -(_.sliderLength - 1) * _.step;
                var sliderMax = _.o.reverse ? (_.sliderLength - 1) * _.step : 0;
                if (!back &&
                    !_.o.loop &&
                    _.o.bounceCoefficient &&
                    (
                        (
                            _.targetPosition > sliderMax &&
                            _.targetPosition > sliderMax + Math.min((to - sliderMax) * _.o.bounceCoefficient, _.o.bounceMax)
                        ) ||
                        (
                            _.targetPosition < sliderMin &&
                            _.targetPosition < sliderMin - Math.min(-(to - sliderMin) * _.o.bounceCoefficient, _.o.bounceMax)
                        )
                    )
                ) {
                    _.animateInstance.stop();
                    _.animateTarget(_.targetPosition < sliderMin ? sliderMin : sliderMax, false, true);
                    _.currentIndex = _.targetPosition < sliderMin ? 0 : _.sliderLength - 1;
                } else {
                    _.renderTarget();
                }
            }, initial ? 0 : 500, function(t) { return t * (2 - t); });
        },
        onChangeCurrentIndex: function (index) {
            var currentIndex = this.o.loop ? index - this.o.loop : index;
            currentIndex = currentIndex === this.sliderLength - this.o.loop * 2 ? 0 : currentIndex;
            if (is.fnc(this.o.change) && currentIndex !== this.lastCurrentIndex) {
                this.o.change(currentIndex, this.lastCurrentIndex);
                this.lastCurrentIndex = currentIndex;
            }
        },
        getCurrentIndex: function () {
            return this.o.loop ? this.currentIndex - this.o.loop : this.currentIndex;
        },
        enable: function () {
            this.enabled = true;
        },
        disable: function () {
            this.enabled = false;
        }
    };


    // Utils

    var is = {
        arr: function (a) { return Array.isArray(a); },
        str: function (a) { return typeof a === 'string'; },
        und: function (a) { return typeof a === 'undefined'; },
        fnc: function(a) { return typeof a === 'function' }
    };

    function stringToHyphens(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    function getCSSValue(el, prop) {
        if (prop in el.style) {
            return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
        }
    }

    var t = 'transform';
    var transformProperty = (getCSSValue(document.body, t) ? t : '-webkit-' + t);

    function buildSlide(value) {
        return '<li class="ms-slide">' + value + '</li>';
    }

    function extendSingle(target, source) {
        for (var key in source)
            target[key] = is.arr(source[key]) ? source[key].slice(0) : source[key];
        return target;
    }

    function extend(target) {
        if (!target) target = {};
        for (var i = 1; i < arguments.length; i++)
            extendSingle(target, arguments[i]);
        return target;
    }

    function animate(step, duration, easing) {
        if (duration) {
            var start = performance.now();
            var timer = null;
            var stopped = false;
            var animation = function (t) {
                var progress = (t - start) / duration;
                if (progress < 0) progress = 0;
                if (progress > 1) progress = 1;
                if (is.fnc(easing)) progress = easing(progress);
                step(progress);
                if (progress !== 1 && !stopped) timer = requestAnimationFrame(animation);
            };
            timer = requestAnimationFrame(animation);
            return new function() {
                this.stop = function() {
                    if (timer) cancelAnimationFrame(timer);
                    stopped = true;
                };
            };
        } else {
            step(1);
        }
    }

    /* eslint-disable */
    function getPassiveSupported() {
        var passiveSupported = false;
        try {
            var options = Object.defineProperty({}, 'passive', {
                get: function get() {
                    passiveSupported = true;
                }
            });

            window.addEventListener('test', null, options);
        } catch (err) {}
        getPassiveSupported = function () {
            return passiveSupported;
        };
        return passiveSupported;
    }
    /* eslint-enable */

    function normalizeEvent(ev) {
        if (ev.type === 'touchmove' || ev.type === 'touchstart' || ev.type === 'touchend') {
            var touch = ev.targetTouches[0] || ev.changedTouches[0];
            return {
                x: touch.clientX,
                y: touch.clientY,
                id: touch.identifier
            };
        } else {
            return {
                x: ev.clientX,
                y: ev.clientY,
                id: null
            };
        }
    }

    function dragOutOfBoundsMultiplier(val) {
        return 0.000005 * Math.pow(val, 2) + 0.0001 * val + 0.55;
    }

    function getCurrentValue(values, diff, lower) {
        var lowerValue = values[0];
        var centerValue = values[1];
        var higherValue = values[2] || lowerValue;
        var diffValue = lower ? centerValue - lowerValue : centerValue - higherValue;
        return lower ? centerValue - diffValue * diff : centerValue + diffValue * diff;
    }

    return extend(MomentumSlider, {
        extend: extend,
        transformProperty: transformProperty,
        getCurrentValue: getCurrentValue
    });

})));


/***/ }),

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_remove_preload_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/remove-preload.js */ "./src/js/components/remove-preload.js");
/* harmony import */ var _components_count_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/count.js */ "./src/js/components/count.js");
/* harmony import */ var _components_achievements_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/achievements-slider.js */ "./src/js/components/achievements-slider.js");




/***/ }),

/***/ "./src/js/components/achievements-slider.js":
/*!**************************************************!*\
  !*** ./src/js/components/achievements-slider.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var momentum_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! momentum-slider */ "./node_modules/momentum-slider/dist/momentum-slider.js");

const achievementsSlider = document.querySelector(".achievements__slider");
const countSlides = Number(achievementsSlider.getAttribute("data-sliders-count") - 1);
const achievementsItem = document.querySelector(".achievements__items");
const achievementsItemText = achievementsItem.querySelectorAll(".sliders__item-text");
const achievementsItemImages = achievementsItem.querySelectorAll(".achievements__item img");
const newAchievementsItemText = [];
achievementsItemText.forEach(text => {
  newAchievementsItemText.push(text.textContent);
});

// Initializing the numbers slider
const msNumbers = new momentum_slider__WEBPACK_IMPORTED_MODULE_0__({
  el: achievementsSlider,
  cssClass: "ms--numbers",
  range: [1, countSlides + 1],
  rangeContent: function (i) {
    return "0" + i;
  },
  style: {
    transform: [{
      scale: [0.4, 1]
    }],
    opacity: [0, 1]
  },
  interactive: false
});

// Initializing the titles slider
const titles = newAchievementsItemText;
const msTitles = new momentum_slider__WEBPACK_IMPORTED_MODULE_0__({
  el: achievementsSlider,
  cssClass: "ms--titles",
  range: [0, countSlides],
  rangeContent: function (i) {
    return "<h3>" + titles[i] + "</h3>";
  },
  vertical: true,
  reverse: true,
  style: {
    opacity: [0, 1]
  },
  interactive: false
});

// Get achievementsPagination items
const achievementsPagination = document.querySelector(".achievements__pagination");
const achievementsPaginationItems = [].slice.call(achievementsPagination.children);

// Initializing the images slider
const msImages = new momentum_slider__WEBPACK_IMPORTED_MODULE_0__({
  el: achievementsItem,
  cssClass: "ms--images",
  range: [0, countSlides],
  rangeContent: function (i) {
    return `<div class="ms-slide__image-container";><div class="ms-slide__image" style="background-image: url('${achievementsItemImages[i].getAttribute("src")}')"></div></div>`;
  },
  sync: [msNumbers, msTitles],
  style: {
    ".ms-slide__image": {
      transform: [{
        scale: [1.5, 1]
      }]
    }
  },
  // Update achievementsPagination if slider change
  change: function (newIndex, oldIndex) {
    if (typeof oldIndex !== "undefined") {
      achievementsPaginationItems[oldIndex].classList.remove("pagination__item--active");
    }
    achievementsPaginationItems[newIndex].classList.add("pagination__item--active");
  }
});

// Select corresponding slider item when a achievementsPagination button is clicked
achievementsPagination.addEventListener("click", function (e) {
  if (e.target.matches(".pagination__button")) {
    const index = achievementsPaginationItems.indexOf(e.target.parentNode);
    msImages.select(index);
  }
});

/***/ }),

/***/ "./src/js/components/count.js":
/*!************************************!*\
  !*** ./src/js/components/count.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map