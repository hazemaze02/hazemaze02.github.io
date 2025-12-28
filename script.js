const logoWrapper = document.querySelector('.logo-wrapper');
const logoImage = document.getElementById('logoImage');

logoWrapper.addEventListener('mouseover', function() {
    logoImage.src = 'images/logo.gif';
});

logoWrapper.addEventListener('mouseout', function() {
    logoImage.src = 'images/logo.png';
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});