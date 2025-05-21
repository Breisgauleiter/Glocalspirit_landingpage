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


// cards mobile logic
// Select all cards
// Select all cards
// Select all cards
let cards = document.querySelectorAll(".card");

// Function to attach click event listeners to cards
function attachCardListeners() {
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Toggle the 'expanded' class
            card.classList.toggle("expanded");
        });
    });
}

// Function to detach click event listeners from cards
function detachCardListeners() {
    cards.forEach(card => {
        const clonedCard = card.cloneNode(true); // Clone the card
        card.replaceWith(clonedCard); // Replace the original card with the clone
    });

    // Reselect the cards after replacing them
    cards = document.querySelectorAll(".card");
}

// Initial setup for screens below 800px
if (window.innerWidth <= 800) {
    attachCardListeners();
}

// Handle resize event
window.addEventListener("resize", () => {
    if (window.innerWidth <= 800) {
        // Close all open cards by removing the 'expanded' class
        cards.forEach(card => {
            card.classList.remove("expanded"); // Collapse all cards
        });

        detachCardListeners(); // Remove existing listeners
        attachCardListeners(); // Reattach listeners
    } else {
        // Close all open cards by removing the 'expanded' class
        cards.forEach(card => {
            card.classList.remove("expanded"); // Collapse all cards
        });

        detachCardListeners(); // Remove listeners for larger screens
    }
});