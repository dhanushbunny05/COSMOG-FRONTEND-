// Elements
const mainContent = document.getElementById('main-content');
const sidebarBtns = document.querySelectorAll('.nav-btn');
const eventContainer = document.querySelector('#events .container');
const galleryItems = document.querySelectorAll('.gallery-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

let currentSlide = 0;

// Function to update active sidebar button
function updateActiveButton(index) {
  sidebarBtns.forEach(btn => btn.classList.remove('active'));
  if (sidebarBtns[index]) {
    sidebarBtns[index].classList.add('active');
  }
}

// Scroll to event panel on sidebar button click
sidebarBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const panels = document.querySelectorAll('.event-panel');
    if (panels[index]) {
      panels[index].scrollIntoView({ behavior: 'smooth' });
    }
    updateActiveButton(index);
  });
});

// Animate event container when in viewport
if (eventContainer) {
  const containerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2 });
  containerObserver.observe(eventContainer);
}

// Show a slide in gallery
function showSlide(index) {
  if (galleryItems.length === 0 || thumbnails.length === 0) return;

  if (index >= galleryItems.length) currentSlide = 0;
  else if (index < 0) currentSlide = galleryItems.length - 1;
  else currentSlide = index;

  galleryItems.forEach(item => item.classList.remove('active'));
  thumbnails.forEach(thumb => thumb.classList.remove('active'));

  galleryItems[currentSlide]?.classList.add('active');
  thumbnails[currentSlide]?.classList.add('active');
}

// Thumbnail clicks for gallery navigation
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    showSlide(i);
  });
});

// Prev/Next buttons for gallery
prevBtn?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});
nextBtn?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

// Initialize gallery to first slide
if (galleryItems.length > 0) showSlide(0);

// Sidebar navigation to update active as scrolling
document.addEventListener('DOMContentLoaded', () => {
  const mainContentPanels = document.querySelectorAll('.event-panel');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(mainContentPanels).indexOf(entry.target);
        if (index !== -1) updateActiveButton(index);
      }
    });
  }, {
    root: mainContent,
    threshold: 0.5,
    rootMargin: '0px'
  });
  mainContentPanels.forEach(panel => observer.observe(panel));
});

// Toggle mobile menu on hamburger click
menuIcon?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Sidebar open/close functions
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}


