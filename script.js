const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('show-menu');
});

const filterButtons = document.querySelectorAll('.filter-btn');
const staffCards = document.querySelectorAll('.staff-card');
const searchInput = document.getElementById('staffSearch');

function animateCards() {
    staffCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate');
    });
}

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

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    staffCards.forEach(card => {
        const name = card.querySelector('.staff-name').textContent.toLowerCase();
        const department = card.querySelector('.staff-department').textContent.toLowerCase();
        const position = card.querySelector('.staff-position').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || department.includes(searchTerm) || position.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

window.addEventListener('load', animateCards);

document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navList.classList.contains('show-menu')) {
        navList.classList.remove('show-menu');
    }
});