'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options (category x status)

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

const selectStatus = document.querySelector('[data-select-status]');
const selectStatusItems = document.querySelectorAll('[data-select-item-status]');
const selectStatusValue = document.querySelector('[data-select-value-status]');
const filterStatusBtn = document.querySelectorAll('[data-filter-status]');

const filterItems = document.querySelectorAll('[data-filter-item]');

let activeCategory = 'all';
let activeStatus = 'all';

const normalizeFilterValue = function (raw) {
    return raw.toLowerCase().replace(/\s*\(.*\)/, '').trim();
};

const applyPortfolioFilters = function () {
    for (let i = 0; i < filterItems.length; i++) {
        const cat = (filterItems[i].dataset.category || '').toLowerCase();
        const st = (filterItems[i].dataset.status || '').toLowerCase();
        const catOk = activeCategory === 'all' || activeCategory === 'all statuses' || cat === activeCategory;
        const stOk = activeStatus === 'all' || activeStatus === 'all statuses' || st === activeStatus;
        if (catOk && stOk) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
};

if (select) {
    select.addEventListener('click', function () {elementToggleFunc(this); });
}

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        activeCategory = normalizeFilterValue(this.innerText);
        if (selectValue) selectValue.innerText = this.innerText;
        if (select) elementToggleFunc(select);
        applyPortfolioFilters();

    });
}

if (selectStatus) {
    selectStatus.addEventListener('click', function () {elementToggleFunc(this); });
}

for (let i = 0; i < selectStatusItems.length; i++) {
    selectStatusItems[i].addEventListener('click', function() {

        activeStatus = normalizeFilterValue(this.innerText);
        if (selectStatusValue) selectStatusValue.innerText = this.innerText;
        if (selectStatus) elementToggleFunc(selectStatus);
        applyPortfolioFilters();

    });
}

//Enabling filter buttons for larger screens

let lastClickedBtn = filterBtn[0];
let lastClickedStatusBtn = filterStatusBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        activeCategory = normalizeFilterValue(this.innerText);
        if (selectValue) selectValue.innerText = this.innerText;
        applyPortfolioFilters();

        if (lastClickedBtn) lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

for (let i = 0; i < filterStatusBtn.length; i++) {

    filterStatusBtn[i].addEventListener('click', function() {

        activeStatus = normalizeFilterValue(this.innerText);
        if (selectStatusValue) selectStatusValue.innerText = this.innerText;
        applyPortfolioFilters();

        if (lastClickedStatusBtn) lastClickedStatusBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedStatusBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}

// Theme toggle (dark / light) with localStorage persistence

const rootEl = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const applyTheme = function (theme) {
    rootEl.setAttribute('data-theme', theme);
    try { localStorage.setItem('laa-theme', theme); } catch (e) {}
    if (themeIcon) themeIcon.setAttribute('name', theme === 'light' ? 'sunny-outline' : 'moon-outline');
};

(function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('laa-theme'); } catch (e) {}
    if (saved === 'light' || saved === 'dark') {
        applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
})();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        const current = rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
    });
}

// Scroll-reveal animations

const revealEls = document.querySelectorAll(
    '.service-item, .stat-item, .lived-item, .timeline-item, .project-item, .blog-post-item, .testimonials-item, .clients-item, .skills-list, .cite-card, .profile-item, .interests, .methods-grid'
);

revealEls.forEach(function (el, idx) {
    el.classList.add('reveal');
    el.style.transitionDelay = ((idx % 4) * 70) + 'ms';
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
} else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
}

// Animated stat counters

const animateCount = function (el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const tick = function (now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

const statNums = document.querySelectorAll('.stat-num');

if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    statNums.forEach(function (el) { counterObserver.observe(el); });
} else {
    statNums.forEach(animateCount);
}

// Animated skill bars (progressive enhancement: bars render full width without JS)

const skillFills = document.querySelectorAll('.skills-progress-fill');

skillFills.forEach(function (fill) {
    fill.dataset.target = fill.style.width || '0%';
    fill.style.width = '0%';
});

const animateSkills = function () {
    skillFills.forEach(function (fill, i) {
        setTimeout(function () { fill.style.width = fill.dataset.target; }, i * 120);
    });
};

const skillsCard = document.querySelector('.skills-list');

if (skillsCard && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsCard);
} else {
    animateSkills();
}

// Timed auto-carousel (2s) for horizontal scrollers, e.g. impact + partners

const startCarousel = function (list, itemSelector, intervalMs) {
    if (!list) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = list.querySelectorAll(itemSelector);
    if (items.length < 2) return;

    let timer = null;

    const stepWidth = function () {
        const gap = parseFloat(getComputedStyle(list).columnGap || getComputedStyle(list).gap) || 0;
        return items[0].getBoundingClientRect().width + gap;
    };

    const advance = function () {
        if (document.hidden) return;
        const aboutPage = document.querySelector('[data-page="about"]');
        if (!aboutPage || !aboutPage.classList.contains('active')) return;
        if (document.querySelector('[data-modal-container].active')) return;

        const maxScroll = list.scrollWidth - list.clientWidth - 4;
        if (list.scrollLeft >= maxScroll) {
            list.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            list.scrollBy({ left: stepWidth(), behavior: 'smooth' });
        }
    };

    const start = function () {
        if (!timer) timer = setInterval(advance, intervalMs);
    };

    const stop = function () {
        if (timer) { clearInterval(timer); timer = null; }
    };

    list.addEventListener('mouseenter', stop);
    list.addEventListener('mouseleave', start);
    list.addEventListener('focusin', stop);
    list.addEventListener('focusout', start);
    list.addEventListener('touchstart', stop, { passive: true });
    list.addEventListener('touchend', start, { passive: true });
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
    });

    start();
};

startCarousel(document.querySelector('.testimonials-list'), '.testimonials-item', 2000);
startCarousel(document.querySelector('.clients-list'), '.clients-item', 2000);