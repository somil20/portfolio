// Dark Mode Toggle
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Resume Download
const resumeDownloadBtn = document.getElementById('resume-download');
if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // This will download a sample resume. Replace with your actual resume URL
        const resumeUrl = 'resume.pdf'; // Replace with your actual resume file
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Somil_Mourya_Resume.pdf';
        link.click();
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:somilmourya20@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
const cards = document.querySelectorAll('.project-card, .stat-card, .skill-category, .contact-card');
cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active link highlighting
window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const linkStyle = document.createElement('style');
linkStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(linkStyle);