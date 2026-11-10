const progressIndicator = document.querySelector('.scroll-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');
const commandDialog = document.querySelector('.command-dialog');
const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateReadingProgress() {
    if (!progressIndicator) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressIndicator.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

if (commandDialog instanceof HTMLDialogElement) {
    const commandTrigger = document.querySelector('.command-trigger');
    const commandSearch = commandDialog.querySelector('input[type="search"]');
    const commandOptions = [...commandDialog.querySelectorAll('.command-option')];
    const commandEmpty = commandDialog.querySelector('.command-empty');

    function openCommandPalette() {
        if (commandDialog.open) return;
        commandDialog.showModal();
        commandSearch.focus();
    }

    function filterCommands() {
        const query = commandSearch.value.trim().toLowerCase();
        let visibleCount = 0;

        commandOptions.forEach((option) => {
            const matches = option.textContent.toLowerCase().includes(query);
            option.hidden = !matches;
            if (matches) visibleCount += 1;
        });
        commandEmpty.hidden = visibleCount > 0;
    }

    commandTrigger.addEventListener('click', openCommandPalette);
    commandDialog.querySelector('.command-close').addEventListener('click', () => commandDialog.close());
    commandSearch.addEventListener('input', filterCommands);
    commandOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const destination = option.dataset.commandHref;
            commandDialog.close();
            if (destination) document.querySelector(destination)?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    commandDialog.addEventListener('click', (event) => {
        if (event.target === commandDialog) commandDialog.close();
    });
    commandDialog.addEventListener('close', () => {
        commandSearch.value = '';
        filterCommands();
        commandTrigger.focus();
    });

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            openCommandPalette();
        }
        if (event.key === 'Escape' && commandDialog.open) {
            commandDialog.close();
        }
        if (event.key === 'Enter' && commandDialog.open && event.target === commandSearch) {
            commandDialog.querySelector('.command-option:not([hidden])')?.click();
        }
    });
}

function closeNavigation() {
    if (!menuToggle || !siteNavigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteNavigation.classList.remove('is-open');
}

if (menuToggle && siteNavigation) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
        siteNavigation.classList.toggle('is-open', !isExpanded);
    });

    navigationLinks.forEach((link) => link.addEventListener('click', closeNavigation));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeNavigation();
            menuToggle.focus();
        }
    });
    window.matchMedia('(min-width: 621px)').addEventListener('change', closeNavigation);
}

const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
const projectCards = [...document.querySelectorAll('.project-card[data-category]')];
const projectCount = document.querySelector('.project-count');

projectFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
        const selectedCategory = filter.dataset.projectFilter;
        let visibleCount = 0;

        projectFilters.forEach((button) => {
            button.setAttribute('aria-pressed', String(button === filter));
        });
        projectCards.forEach((card) => {
            const isVisible = selectedCategory === 'all' || card.dataset.category === selectedCategory;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        if (projectCount) {
            projectCount.textContent = selectedCategory === 'all'
                ? `Showing all ${visibleCount} projects`
                : `Showing ${visibleCount} ${filter.textContent.trim().toLowerCase()} project${visibleCount === 1 ? '' : 's'}`;
        }
    });
});

if ('IntersectionObserver' in window) {
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

    const revealTargets = document.querySelectorAll('.intro-section, .experience-item, .project-card, .skill-group, .education-card, .awards-band, .contact-inner');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((target, index) => {
        target.classList.add('reveal');
        target.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
        revealObserver.observe(target);
    });
}
