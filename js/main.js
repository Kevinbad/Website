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
