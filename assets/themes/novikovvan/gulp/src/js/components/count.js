const countBlock = document.querySelector(".count-block");

if (countBlock) {
  const counts = document.querySelectorAll(".count span");
  const speed = 200;

  counts.forEach((counter) => {
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
      threshold: 0.1,
    };
    const observerBottles = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
    counts.forEach((counter) => {
      counter.textContent = 0;
    });
  }
}
