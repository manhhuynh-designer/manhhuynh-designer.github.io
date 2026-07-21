// js/theme.js

export let currentTheme = 'dark'; // Always dark

export function applyTheme(theme) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
}

export function setupThemeToggle() {
    // No-op: theme toggle removed
}

// Ensure theme is applied when header or DOM loads
document.addEventListener('headerLoaded', () => {
    applyTheme('dark');
});

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme('dark');
    });
    applyTheme('dark');
}