// --- 1. Global Variables & Selectors ---
const menuBtn = document.querySelector('.menu-btn');
const navUl = document.querySelector('nav ul');
const undercolor = document.querySelector('.undercolor');
const filterButtons = document.querySelectorAll('.filter-btn');
const staffCards = document.querySelectorAll('.staff-card');
const searchInput = document.getElementById('staffSearch');
const clubSelect = document.getElementById('clubInterest'); // For student.html

// --- 2. Initial Setup (Load Event) ---
window.addEventListener('load', function () {
    // A. Animate Header Underline
    if (undercolor) {
        undercolor.classList.add('active');
    }

    // B. Initialize Modal System
    setupModalSystem();

    // C. Animate Staff Cards (if present)
    animateCards();
});

// --- 3. Navigation & Mobile Menu ---
if (menuBtn && navUl) {
    menuBtn.addEventListener('click', () => {
        navUl.classList.toggle('show-menu');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navUl.contains(e.target) && !menuBtn.contains(e.target) && navUl.classList.contains('show-menu')) {
            navUl.classList.remove('show-menu');
        }
    });

    // Close menu when clicking a link
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('show-menu');
        });
    });
}

// --- 4. Universal Modal System ---
function setupModalSystem() {
    // 4.1 Inject Modal CSS
    const modalStyle = document.createElement('style');
    modalStyle.innerHTML = `
        .uni-modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
            z-index: 2000; display: none; justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.3s ease;
        }
        .uni-modal-overlay.active { display: flex; opacity: 1; }
        .uni-modal-content {
            background: white; width: 90%; max-width: 500px;
            border-radius: 15px; padding: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateY(20px); transition: transform 0.3s ease;
            overflow: hidden; max-height: 90vh; overflow-y: auto;
        }
        .uni-modal-overlay.active .uni-modal-content { transform: translateY(0); }
        .uni-modal-header { position: relative; height: 200px; overflow: hidden; }
        .uni-modal-header img { width: 100%; height: 100%; object-fit: cover; }
        .uni-modal-close {
            position: absolute; top: 15px; right: 15px;
            background: rgba(0,0,0,0.5); color: white; border: none;
            width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
            font-size: 1.2rem; display: flex; align-items: center; justify-content: center;
            transition: background 0.2s;
        }
        .uni-modal-close:hover { background: rgba(0,0,0,0.8); }
        .uni-modal-body { padding: 25px; }
        .uni-modal-title { margin: 0 0 10px 0; color: #00a651; font-size: 1.5rem; }
        .uni-modal-text { color: #555; line-height: 1.6; margin-bottom: 20px; }
        .uni-modal-action {
            display: block; width: 100%; padding: 12px; border: none;
            background: #00a651; color: white; font-weight: bold;
            border-radius: 8px; cursor: pointer; text-align: center;
            text-decoration: none; transition: background 0.2s;
        }
        .uni-modal-action:hover { background: #008744; }
    `;
    document.head.appendChild(modalStyle);

    // 4.2 Inject Modal HTML
    if (!document.getElementById('uniModal')) {
        const modalHTML = `
            <div class="uni-modal-overlay" id="uniModal">
                <div class="uni-modal-content">
                    <div class="uni-modal-header">
                        <img id="uniModalImg" src="" alt="Detail">
                        <button class="uni-modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="uni-modal-body">
                        <h3 id="uniModalTitle" class="uni-modal-title">Title</h3>
                        <p id="uniModalText" class="uni-modal-text">Description goes here.</p>
                        <button id="uniModalBtn" class="uni-modal-action" onclick="closeModal()">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 4.3 Setup Click Listeners
    attachGlobalListeners();
}

function attachGlobalListeners() {
    // Buttons in News & Events
    document.querySelectorAll('.event-btn, .feature-link').forEach(btn => {
        const href = btn.getAttribute('href');
        // If the button is a placeholder link, hijack it
        if (!href || href === '#' || href.includes('javascript') || href === '') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.event-card, .news-item-card, .feature-card, .news-card');
                if (card) extractAndOpen(card, btn.textContent);
            });
        }
    });

    // Make Cards Interactive (Student Page, etc.)
    document.querySelectorAll('.campus-grid .card, .events-grid .card, .scholarship-grid .card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            extractAndOpen(card, "View More Info");
        });
    });
}

function extractAndOpen(cardElement, actionText) {
    const imgEl = cardElement.querySelector('img');
    const titleEl = cardElement.querySelector('h3, .event-title, .news-headline');
    const descEl = cardElement.querySelector('p, .event-desc, .news-summary');

    const img = imgEl ? imgEl.src : '/img/foa-about-pic2.svg';
    const title = titleEl ? titleEl.innerText : 'Information';
    const desc = descEl ? descEl.innerText : 'Details are currently being updated. Please check back later or contact the department.';

    openModal({
        title: title,
        description: desc,
        image: img,
        buttonText: "Got it!"
    });
}

// Global API
window.openModal = function ({ title, description, image, buttonText }) {
    const modal = document.getElementById('uniModal');
    if (!modal) return;

    document.getElementById('uniModalTitle').innerText = title;
    document.getElementById('uniModalText').innerText = description;
    document.getElementById('uniModalImg').src = image;
    document.getElementById('uniModalBtn').innerText = buttonText || 'Close';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function () {
    const modal = document.getElementById('uniModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on Overlay Click
document.addEventListener('click', (e) => {
    if (e.target.id === 'uniModal') closeModal();
});

// --- 5. Staff Page Logic ---
function animateCards() {
    if (staffCards.length === 0) return;
    staffCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate');
    });
}

// Staff Filters
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');

            staffCards.forEach(card => {
                card.classList.remove('animate');
                if (filterValue === 'all' || card.getAttribute('data-department') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            setTimeout(() => {
                document.querySelectorAll('.staff-card[style*="display: block"]').forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('animate');
                });
            }, 10);
        });
    });
}

// Staff Search
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        staffCards.forEach(card => {
            const name = card.querySelector('.staff-name').textContent.toLowerCase();
            const dept = card.querySelector('.staff-department').textContent.toLowerCase();
            const pos = card.querySelector('.staff-position').textContent.toLowerCase();

            if (name.includes(searchTerm) || dept.includes(searchTerm) || pos.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// --- 6. Student Page Logic ---
if (clubSelect) {
    clubSelect.addEventListener('change', function () {
        const filterValue = this.value;
        const cards = document.querySelectorAll('.club-card');

        cards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-tag') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
