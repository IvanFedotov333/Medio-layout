"use strict";

/** Gallery carousel */
const items = [...document.querySelectorAll(".gallery__item")];
const total = items.length;
let activeIndex = 0;

function render() {
  items.forEach((item, i) => {
    let position = (i - activeIndex + total) % total;
    if (position > total / 2) {
      position -= total;
    }
    item.className = "gallery__item pos-" + position;
  });
}

items.forEach((item, i) => {
  item.addEventListener("click", () => {
    activeIndex = i;
    render();
  });
});

render();

/*Testimonials accordion*/

document.querySelectorAll("[data-testimonial]").forEach((card) => {
  const header = card.querySelector(".testimonial__header");
  header.addEventListener("click", () => {
    const isActive = card.classList.contains("is-active");

    document.querySelectorAll("[data-testimonial]").forEach((c) => {
      c.classList.remove("is-active");
      c.querySelector(".testimonial__header").setAttribute(
        "aria-expanded",
        "false",
      );
    });

    if (!isActive) {
      card.classList.add("is-active");
      header.setAttribute("aria-expanded", "true");
    }
  });
});

/*Sticky-header*/
const header = document.querySelector(".header");

if (header) {
  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
/*Form-handler */
function handleForm(formId, messageId) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  if (!form || !message) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      message.textContent =
        "Необходимо корректно заполнить все поля и поставить галочку согласия.";
      message.className = "form-message form-message--error";
      message.hidden = false;
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.computedStyleMap.opacity = "0.6";

    setTimeout(() => {
      message.textContent =
        "Спасибо! Мы свяжемся с вами в течение рабочего дня.";
      message.className = "form-message form-message--success";
      message.hidden = false;

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      setTimeout(() => {
        message.hidden = true;
      }, 7000);
    }, 800);
  });
}

handleForm("contactForm", "contactMessage");
handleForm("appointmentForm", "appointmentMessage");
