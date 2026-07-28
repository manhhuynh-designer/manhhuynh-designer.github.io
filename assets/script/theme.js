// assets/script/theme.js

export let currentTheme = localStorage.getItem('theme') || 'dark';

export function updateThemeToggleUI(theme) {
    const darkOption = document.getElementById('theme-select-dark');
    const lightOption = document.getElementById('theme-select-light');
    
    if (theme === 'light') {
        if (darkOption) {
            darkOption.className = 'theme-option transition-colors duration-300 hover:text-white text-white/50';
        }
        if (lightOption) {
            lightOption.className = 'theme-option transition-colors duration-300 hover:text-white text-white';
        }
    } else {
        if (darkOption) {
            darkOption.className = 'theme-option transition-colors duration-300 hover:text-white text-white';
        }
        if (lightOption) {
            lightOption.className = 'theme-option transition-colors duration-300 hover:text-white text-white/50';
        }
    }
}

export function applyTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleUI(theme);
}

export function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

export function setupThemeToggle() {
    const darkOption = document.getElementById('theme-select-dark');
    const lightOption = document.getElementById('theme-select-light');
    
    if (darkOption && !darkOption.dataset.bound) {
        darkOption.dataset.bound = "true";
        darkOption.addEventListener('click', (e) => {
            e.preventDefault();
            applyTheme('dark');
        });
    }
    
    if (lightOption && !lightOption.dataset.bound) {
        lightOption.dataset.bound = "true";
        lightOption.addEventListener('click', (e) => {
            e.preventDefault();
            applyTheme('light');
        });
    }
    
    updateThemeToggleUI(currentTheme);
}

// Auto-initialize theme on script execution
if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupThemeToggle();
        });
    } else {
        setupThemeToggle();
    }
    
    document.addEventListener('headerLoaded', () => {
        setupThemeToggle();
    });
}