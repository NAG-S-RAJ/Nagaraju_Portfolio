// Get the navigation bar element
const navBar = document.querySelector('.header');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');

// Get the offset position of the navigation bar

// Function to update the navigation bar style
function updateNavBarStyle() {
  if (window.pageYOffset > 100) {
    // Add the "scrolled" class to the navigation bar
    navBar.classList.add('head-scrolled');
    title.classList.add('title-scrolled');
    subtitle.classList.remove('subtitle');
  } else {
    // Remove the "scrolled" class from the navigation bar
    navBar.classList.remove('head-scrolled');
    title.classList.remove('title-scrolled');
    subtitle.classList.add('subtitle');
  }
}

// Listen to the "scroll" event and update the navigation bar style
window.addEventListener('scroll', updateNavBarStyle);
