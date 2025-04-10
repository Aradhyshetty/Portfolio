const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Color Theme Selector
const themeBtns = document.querySelectorAll('.theme-btn');

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        themeBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const color = btn.getAttribute('data-color');
        document.documentElement.style.setProperty('--primary', `var(--theme-${color})`);
        
        // Update secondary color based on selection
        let secondaryColor;
        switch(color) {
            case 'blue':
                secondaryColor = '#3f37c9';
                break;
            case 'purple':
                secondaryColor = '#560bad';
                break;
            case 'green':
                secondaryColor = '#1b7e3b';
                break;
            case 'red':
                secondaryColor = '#d90429';
                break;
            default:
                secondaryColor = '#3f37c9';
        }
        document.documentElement.style.setProperty('--secondary', secondaryColor);
        
        // Save theme preference
        localStorage.setItem('colorTheme', color);
    });
});

// Load saved color theme
const savedColorTheme = localStorage.getItem('colorTheme') || 'blue';
const savedThemeBtn = document.querySelector(`.theme-btn[data-color="${savedColorTheme}"]`);
if (savedThemeBtn) {
    savedThemeBtn.click();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animate elements when scrolling
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .contact-item');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.project-card, .timeline-item, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);