// links class toggler
const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.header__link--active')?.classList.remove('header__link--active');
    link.classList.add('header__link--active');
  });
});

// Slider logic for .about__content
const aboutContent = document.querySelector('.about__content');
const aboutItems = document.querySelectorAll('.about__item');
const btnLeft = document.querySelector('.btn__slider--left');
const btnRight = document.querySelector('.btn__slider--right');

let currentIndex = 0; // Track the current visible item
let itemWidth = aboutItems[0].offsetWidth; // Width of a single item

// Function to update the transform of the aboutContent
function updateSlider() {
  aboutContent.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Function to recalculate itemWidth on window resize
function recalculateWidths() {
  itemWidth = aboutItems[0].offsetWidth; // Recalculate the width of a single item
  updateSlider(); // Reapply the transform to ensure proper alignment
}

// Event listener for the right button
btnRight.addEventListener('click', () => {
  if (currentIndex < aboutItems.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

// Event listener for the left button
btnLeft.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Event listener for window resize
window.addEventListener('resize', recalculateWidths);

// Initial centering of the first item
// updateSlider();
// canva js particles


document.addEventListener("DOMContentLoaded", () => {
    function setBodyHeight() {
    const body = document.getElementById('body');
    const vh = window.innerHeight;
    body.style.height = `${vh}px`;
  }

  window.addEventListener('load', setBodyHeight);
  window.addEventListener('resize', setBodyHeight);
});