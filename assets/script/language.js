// js/language.js
import { languages, portfolioProjects } from './data.js';

export let currentLanguage = localStorage.getItem('lang') || 'vi'; // Default to Vietnamese

// Function to update content based on selected language
export function updateContent(lang) {
    // Update document title if 'title' key exists for the language
    if (languages[lang] && languages[lang]['title']) {
        document.title = languages[lang]['title'];
    }

    const elements = document.querySelectorAll('[data-lang-key]'); //
    elements.forEach(el => { //
        // Add a null check for 'el' to prevent errors if an element somehow becomes null
        if (!el) {
            console.warn('Attempted to update a null element with data-lang-key. Skipping.');
            return;
        }

        const key = el.getAttribute('data-lang-key'); //
        if (languages[lang][key]) { //
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { //
                el.placeholder = languages[lang][key]; //
            } else if (el.tagName === 'TITLE') { //
                // Handled above, but kept for backward compatibility if title tag still has data-lang-key
                document.title = languages[lang][key]; //
            } else {
                el.innerHTML = languages[lang][key]; //
            }
        }
    });


    document.documentElement.lang = lang; // Update HTML lang attribute
    const langButton = document.getElementById('lang-toggle-button'); //
    if (langButton) { //
        langButton.textContent = lang.toUpperCase() === 'VI' ? 'English' : 'Tiếng Việt'; // Update button text
    }

    // Update footer lang selector state
    const selectVi = document.getElementById('lang-select-vi');
    const selectEn = document.getElementById('lang-select-en');
    if (selectVi && selectEn) {
        if (lang === 'vi') {
            selectVi.className = 'lang-option text-white font-bold cursor-default pointer-events-none select-none';
            selectEn.className = 'lang-option text-white/50 hover:text-white transition-colors duration-300 cursor-pointer select-none';
        } else {
            selectVi.className = 'lang-option text-white/50 hover:text-white transition-colors duration-300 cursor-pointer select-none';
            selectEn.className = 'lang-option text-white font-bold cursor-default pointer-events-none select-none';
        }
    }

    localStorage.setItem('lang', lang); 

    // Expose language data and current lang for subpages
    window.langData = languages;
    window.currentLang = lang;
    
    // Dispatch event for components that need manual update
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function setupLanguageToggle() {
    const langToggleButton = document.getElementById('lang-toggle-button'); //
    if (langToggleButton) { //
        langToggleButton.addEventListener('click', () => { //
            currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi'; //
            updateContent(currentLanguage); //
        });
    }

    // Support footer language selector options
    const selectVi = document.getElementById('lang-select-vi');
    const selectEn = document.getElementById('lang-select-en');
    if (selectVi && selectEn) {
        selectVi.addEventListener('click', () => {
            if (currentLanguage !== 'vi') {
                currentLanguage = 'vi';
                updateContent(currentLanguage);
            }
        });
        selectEn.addEventListener('click', () => {
            if (currentLanguage !== 'en') {
                currentLanguage = 'en';
                updateContent(currentLanguage);
            }
        });
    }
}