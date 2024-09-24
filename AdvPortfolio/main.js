document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const typingElement = document.querySelector(".typedText");
  if (typingElement) {
      new Typed(".typedText", {
          strings: ["Student at SRM"],
          loop: true,
          typeSpeed: 100,
          backSpeed: 80,
          backDelay: 2000
      });
  }

  // Scroll reveal animations
  const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
  });

  // Reveal elements
  sr.reveal('.featured-text-card', {});
  sr.reveal('.featured-name', { delay: 100 });
  sr.reveal('.featured-text-info', { delay: 200 });
  sr.reveal('.featured-text-btn', { delay: 200 });
  sr.reveal('.social_icons', { delay: 200 });
  sr.reveal('.featured-image', { delay: 300 });
  sr.reveal('.project-box', { interval: 200 });
  sr.reveal('.top-header', {});

  // Scroll active link highlighting
  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
      sections.forEach(current => {
          const navLink = document.querySelector('.nav-menu a[href*=' + current.getAttribute('id') + ']');
          if (navLink) {
              if (isElementInViewport(current)) {
                  navLink.classList.add('active-link');
              } else {
                  navLink.classList.remove('active-link');
              }
          }
      });
  }

  window.addEventListener('scroll', scrollActive);

  // Theme toggle functionality
  const themeToggleButton = document.querySelector('.change-theme');
  const htmlElement = document.documentElement; // Targets the <html> element
  const darkThemeClass = 'dark-theme';
  const iconMoon = 'uil-moon';
  const iconSun = 'uil-sun';

  (function () {
      const savedTheme = localStorage.getItem('selected-theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme) {
          htmlElement.classList.toggle(darkThemeClass, savedTheme === 'dark');
      } else {
          htmlElement.classList.toggle(darkThemeClass, prefersDark);
      }
      themeToggleButton.classList.toggle(iconMoon, htmlElement.classList.contains(darkThemeClass));
      themeToggleButton.classList.toggle(iconSun, !htmlElement.classList.contains(darkThemeClass));
  })();

  if (themeToggleButton) {
      themeToggleButton.addEventListener('click', () => {
          htmlElement.classList.toggle(darkThemeClass);
          themeToggleButton.classList.toggle(iconMoon);
          themeToggleButton.classList.toggle(iconSun);
          localStorage.setItem('selected-theme', getCurrentTheme());
          localStorage.setItem('selected-icon', getCurrentIcon());
      });
  }
});

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
