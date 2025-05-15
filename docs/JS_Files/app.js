
// links class toggler
const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.header__link--active')?.classList.remove('header__link--active');
    link.classList.add('header__link--active');
  });
});

// canva js particles



