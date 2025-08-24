const mainContent = document.getElementById('main-content');
const sidebarBtns = document.querySelectorAll('.nav-btn');
const eventContainer = document.querySelector('#events .container');

function updateActiveButton(index) {
    sidebarBtns.forEach(btn => btn.classList.remove('active'));
    if (sidebarBtns[index]) {
        sidebarBtns[index].classList.add('active');
    }
}

// Handle sidebar button click to scroll
sidebarBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const panels = document.querySelectorAll('.event-panel');
        if (panels[index]) {
            panels[index].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate the container when it comes into view
if (eventContainer) {
    const containerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation
                containerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    containerObserver.observe(eventContainer);
}

// Gallery Logic
const galleryItems = document.querySelectorAll('.gallery-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;

function showSlide(index) {
    if (galleryItems.length === 0 || thumbnails.length === 0) return;

    if (index >= galleryItems.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = galleryItems.length - 1;
    } else {
        currentSlide = index;
    }

    galleryItems.forEach(item => item.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    if (galleryItems[currentSlide]) {
        galleryItems[currentSlide].classList.add('active');
    }
    if (thumbnails[currentSlide]) {
        thumbnails[currentSlide].classList.add('active');
    }
}

// Thumbnail clicks
if (thumbnails.length > 0) {
    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            showSlide(i);
        });
    });
}

// Prev/Next buttons
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Initialize safely
if (galleryItems.length > 0) {
    showSlide(0);
}

// Mobile Navbar logic
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});


// Initial observer setup for the pre-filled panels
document.addEventListener('DOMContentLoaded', () => {
    const mainContentPanels = document.querySelectorAll('.event-panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(mainContentPanels).indexOf(entry.target);
                if (index !== -1) {
                    updateActiveButton(index);
                }
            }
        });
    }, {
        root: mainContent,
        threshold: 0.5,
        rootMargin: '0px'
    });
    mainContentPanels.forEach(panel => observer.observe(panel));
});
