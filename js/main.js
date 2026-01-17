// Solvenza Solutions V3
console.log('Solvenza Loaded');
feather.replace();

// Lead Form Slider Logic
const slider = document.getElementById('vaSlider');
const display = document.getElementById('vaCountDisplay');

if (slider && display) {
    slider.addEventListener('input', (e) => {
        display.textContent = e.target.value;
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-question');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const icon = item.querySelector('i');

        // Toggle Active Class
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Dynamic Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    // Inject "Start Delegating" button for mobile
    const desktopBtn = document.querySelector('.nav-container .btn-primary');
    if (desktopBtn) {
        const mobileBtn = document.createElement('li');
        mobileBtn.innerHTML = `<a href="${desktopBtn.getAttribute('href')}" class="nav-link text-script" style="color: var(--color-gold); margin-top: 10px;">${desktopBtn.textContent}</a>`;
        navLinks.appendChild(mobileBtn);
    }

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Optional: Toggle icon between menu and x
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-feather', 'x');
        } else {
            icon.setAttribute('data-feather', 'menu');
        }
        feather.replace();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-feather', 'menu');
            feather.replace();
        });
    });
}

// Contact Form Submission (Web3Forms)
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Button state
        const btn = leadForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Collect form data
        const formData = new FormData(leadForm);

        // Collect support needs (checkboxes) manually if needed, 
        // but FormData handles multiple values with same name by appending them.
        // Web3Forms sends them as arrays or comma-separated strings automatically.

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(async (response) => {
                if (response.status === 200) {
                    btn.textContent = 'Sent Successfully!';
                    btn.style.backgroundColor = '#10B981'; // Green
                    leadForm.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    console.log(response);
                    btn.textContent = 'Failed. Try again.';
                    btn.style.backgroundColor = '#EF4444'; // Red
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('FAILED...', error);
                btn.textContent = 'Failed. Try again.';
                btn.style.backgroundColor = '#EF4444'; // Red
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            });
    });
}
// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
}, {
    root: null,
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Testimonial Carousel
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    // Reset all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activate current
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

if (slides.length > 0) {
    // Auto Play
    setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, 5000); // 5 Seconds

    // Click on Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Application Form Logic (Candidate)
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default redirect

        const btn = applicationForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        // Feedback: Sending
        btn.textContent = 'Submitting Application...';
        btn.disabled = true;

        const formData = new FormData(applicationForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Success
                    btn.textContent = 'Application Sent!';
                    btn.style.backgroundColor = '#10B981'; // Green

                    // Show detailed success message if possible, or just reset
                    // window.location.href = "thank-you-apply.html"; // Optional redirect

                    applicationForm.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    console.log(response);
                    btn.textContent = 'Failed. Try again.';
                    btn.style.backgroundColor = '#EF4444'; // Red
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('FAILED...', error);
                btn.textContent = 'Failed. Try again.';
                btn.style.backgroundColor = '#EF4444'; // Red
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            });
    });
}
