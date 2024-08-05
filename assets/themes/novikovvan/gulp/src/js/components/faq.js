const faqParent = document.querySelectorAll(".faq__elem");

faqParent.forEach((faqParent) => {
  const faqBodyParent = faqParent.parentElement;
  const faqBody = faqParent.querySelector(".faq__answer");
  if (faqParent.classList.contains("active")) {
    faqBodyParent.classList.add("active");

    faqBody.style.maxHeight = faqBody.scrollHeight + "px";
  } else {
    faqBodyParent.classList.remove("active");

    faqBody.style.maxHeight = 0;
  }

  faqParent.addEventListener("click", () => {
    faqParent.classList.toggle("active");

    const faqBody = faqParent.querySelector(".faq__answer");
    if (faqParent.classList.contains("active")) {
      faqBodyParent.classList.add("active");

      faqBody.style.maxHeight = faqBody.scrollHeight + "px";
    } else {
      faqBodyParent.classList.remove("active");

      faqBody.style.maxHeight = 0;
    }
  });
});
