'use strict';
// ============  Header Menu
const menuBtn = document.getElementById('menu-toggler');
const menuContent = document.getElementById('menu');
const navLinks = document.querySelectorAll('.header__menu-list li');

menuBtn.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

function toggleMenu() {
  menuContent.classList.toggle('open');
}
function closeMenu() {
  menuContent.classList.remove('open');
}

// =========== Show & Hide Button Scroll to Top
const btnUp = document.getElementById('btn-up');
const header = document.querySelector('.header');
window.onscroll = function () {
  const windowHeight = window.innerHeight;

  if (window.scrollY > 20) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }

  if (window.scrollY > windowHeight) {
    btnUp.classList.add('show');
  } else {
    btnUp.classList.remove('show');
  }
};

// ============  Agenda Tabs
const tabBtns = document.querySelectorAll('.agenda__tab-btn');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach((btn) => {
      btn.classList.remove('active');
    });

    btn.classList.add('active');

    const tabContents = document.querySelectorAll('.agenda__tab');
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === target) {
        content.classList.add('active');
      }
    });
  });
});

// ============ Gallery
const galleryModal = document.getElementById('gallery-modal');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderTrack = document.getElementById('sliderTrack');
const galleryItems = document.querySelectorAll('.summit__gallery-item img');

let currentIndex = 0;

galleryItems.forEach((img) => {
  const slide = document.createElement('img');
  slide.src = img.src;
  slide.alt = img.alt;
  const sliderItem = document.createElement('div');
  sliderItem.classList.add('modal__slider-item');
  sliderItem.appendChild(slide);
  sliderTrack.appendChild(sliderItem);
});

galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openModal();
    updateSliderPosition();
  });
});

closeBtn.addEventListener('click', closeModal);

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < galleryItems.length - 1) {
    currentIndex++;
    updateSliderPosition();
  }
});

window.addEventListener('keydown', (e) => {
  if (galleryModal.style.display === 'block') {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});

galleryModal.addEventListener('click', (e) => {
  const isClickOutside =
    !e.target.closest('.modal__slider') &&
    !e.target.closest('.modal-btn') &&
    !e.target.closest('.modal-btn') &&
    !e.target.closest('.modal-btn');
  if (isClickOutside) {
    closeModal();
  }
});

window.addEventListener('resize', updateSliderPosition);

function openModal() {
  galleryModal.style.display = 'block';

  setTimeout(() => {
    sliderTrack.style.opacity = 1;
    sliderTrack.style.visibility = 'visible';
  }, 350);
}

function closeModal() {
  galleryModal.style.display = 'none';
  sliderTrack.style.opacity = 0;
  sliderTrack.style.visibility = 'hidden';
}

function updateSliderPosition() {
  const slideWidth = sliderTrack.children[0].clientWidth + 0.25;
  sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  prevBtn.classList.toggle('disabled', currentIndex === 0);
  nextBtn.classList.toggle('disabled', currentIndex === galleryItems.length - 1);
}

// ==================== Footer Year
const footerYear = document.getElementById('full-year');
footerYear.textContent = new Date().getFullYear();

// ===================== Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timer__item-time');
  // Date Setting
  // futureDate = YYYY/MM/DD/HH/MM/SS+0800 => Hong Kong Time zone
  const futureDate = new Date('2026-09-09T15:00:00+08:00');

  const futureTime = futureDate.getTime();

  function getRemainingTime() {
    const now = new Date().getTime();
    const t = futureTime - now;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;

    let day = Math.floor(t / oneDay);
    let hour = Math.floor((t % oneDay) / oneHour);
    let minute = Math.floor((t % oneHour) / oneMinute);
    let second = Math.floor((t % oneMinute) / oneSecond);

    const val = [day, hour, minute, second];

    function format(item) {
      return item < 10 ? `${item}` : item;
    }

    items.forEach((item, index) => {
      item.innerHTML = t > 1 ? format(val[index]) : '00';
    });

    if (t < 1) clearInterval(countdown);
  }

  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
});
