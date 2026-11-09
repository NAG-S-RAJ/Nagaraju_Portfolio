const progressIndicator = document.querySelector('.scroll-progress span');
const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateReadingProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressIndicator.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navigationLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }
}, { rootMargin: '-25% 0px -65% 0px' });

observedSections.forEach((section) => sectionObserver.observe(section));
