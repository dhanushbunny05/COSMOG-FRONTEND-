const eventData = [
    {
        title: "Day 1 – Morning",
        subEvents: [
            { name: "Art & Craft", info: "Art & Craft is a creative event where participants create artwork using various materials. It fosters innovation and teamwork." },
            { name: "Inauguration", info: "The Inauguration ceremony formally opens the event, with speeches from dignitaries and a keynote address." }
        ]
    },
    {
        title: "Day 1 – Evening",
        subEvents: [
            { name: "Game-On", info: "Game-On is a competitive gaming event featuring various multiplayer matches and contests." },
            { name: "Mission Impossible", info: "Mission Impossible challenges teams with complex puzzles and tasks to test their problem-solving skills." }
        ]
    },
    {
        title: "Day 2 – Morning",
        subEvents: [
            { name: "Movie Rampage", info: "Movie Rampage is a fun-filled event where participants showcase skills in film making and editing." },
            { name: "Editing Contest", info: "The Editing Contest tests participants' abilities to creatively edit videos within time constraints." }
        ]
    },
    {
        title: "Day 2 – Evening",
        subEvents: [
            { name: "TreQueza", info: "TreQueza is a team-based quiz contest with various rounds testing general knowledge and technical topics." },
            { name: "Cultural Carnival", info: "The Cultural Carnival features performances, dance, and music to celebrate diverse cultures." }
        ]
    }
];

const mainContent = document.getElementById('main-content');
const sidebarBtns = document.querySelectorAll('.nav-btn');
const eventContainer = document.querySelector('#events .container');

function createPanelHTML(data) {
    return `
      <div class="event-panel">
        <h2>${data.title}</h2>
        <div class="sub-events">
          ${data.subEvents.map(event => `
            <div class="event-box">
              <h3>${event.name}</h3>
              <div class="event-info">${event.info}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
}

function renderPanels() {
    mainContent.innerHTML = eventData.map(createPanelHTML).join('');
}

function updateActiveButton(index) {
    sidebarBtns.forEach(btn => btn.classList.remove('active'));
    if (sidebarBtns[index]) {
        sidebarBtns[index].classList.add('active');
    }
}

// Handle scroll snapping and button highlighting
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const panels = document.querySelectorAll('.event-panel');
            const index = Array.from(panels).indexOf(entry.target);
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

// Sidebar button click to scroll
sidebarBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const panels = document.querySelectorAll('.event-panel');
        panels[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Animate the container when it comes into view
const containerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.5
});

containerObserver.observe(eventContainer);

// Initial render and attach observers
renderPanels();
document.querySelectorAll('.event-panel').forEach(panel => observer.observe(panel));

// Gallery Logic
const galleryItems = document.querySelectorAll('.gallery-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;

function showSlide(index) {
    if (index >= galleryItems.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = galleryItems.length - 1;
    } else {
        currentSlide = index;
    }
    
    galleryItems.forEach(item => item.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    galleryItems[currentSlide].classList.add('active');
    thumbnails[currentSlide].classList.add('active');
}

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        showSlide(index);
    });
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Initialize gallery
showSlide(currentSlide);

// Sidebar navigation logic for mobile menu
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}