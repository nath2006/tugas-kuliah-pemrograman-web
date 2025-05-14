// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  
  // Check if user has previously set a theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or default to light
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  } else {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on user preference
    const initialTheme = prefersDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
    localStorage.setItem('theme', initialTheme);
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    
    // Toggle theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Apply new theme
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
    
    // Announce theme change for accessibility
    announceThemeChange(newTheme);
  });
  
  // Function to announce theme change for screen readers
  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `Theme changed to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
});
