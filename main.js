let currentLang = 'en';
let translations = {};

// Load translations from JSON
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        updateUI();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Update all elements with data-key attribute
function updateUI() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            const content = translations[currentLang][key];
            
            // Special handling for lists (e.g., festivals)
            if (Array.isArray(content)) {
                if (el.id === 'festivals-list') {
                    renderFestivals(content);
                }
            } else {
                el.innerText = content;
            }
        }
    });

    // Update visibility of lang-specific spans
    document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', currentLang !== 'en'));
    document.querySelectorAll('.ta').forEach(el => el.classList.toggle('hidden', currentLang !== 'ta'));
}

// Render dynamic festival cards
function renderFestivals(list) {
    const listEl = document.getElementById('festivals-list');
    listEl.innerHTML = '';
    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'festival-item glass';
        card.innerHTML = `<h3>${item}</h3>`;
        listEl.appendChild(card);
    });
}

// Toggle language
document.getElementById('toggleLang').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    updateUI();
});

// Scroll Reveal Animation (Simple)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Initial Load
document.addEventListener('DOMContentLoaded', loadTranslations);
