// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav ul');

menuBtn.addEventListener('click', ()=>{
    navList.classList.toggle('show-menu')
});

// Staff filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const staffCards = document.querySelectorAll('.staff-card');
const searchInput = document.getElementById('staffSearch');

// Filter by department
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        staffCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-department') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search functionality
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

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navList.classList.contains('show-menu')) {
        navList.classList.remove('show-menu');
    }
});