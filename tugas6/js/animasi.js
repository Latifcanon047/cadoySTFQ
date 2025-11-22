document.addEventListener("scroll", () => {
  document.querySelectorAll(".my-animation-texst2").forEach((el) => {
    let posisi = el.getBoundingClientRect().top;
    if (posisi < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

document.addEventListener("scroll", () => {
  document.querySelectorAll(".my-animation-img2").forEach((el) => {
    let posisi = el.getBoundingClientRect().top;
    if (posisi < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

document.addEventListener("scroll", () => {
  document.querySelectorAll(".my-animation-texst3").forEach((el) => {
    let posisi = el.getBoundingClientRect().top;
    if (posisi < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

document.addEventListener("scroll", () => {
  document.querySelectorAll(".my-animation-img3").forEach((el) => {
    let posisi = el.getBoundingClientRect().top;
    if (posisi < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
