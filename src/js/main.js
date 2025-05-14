// Main JavaScript for StyleHub online shop

document.addEventListener('DOMContentLoaded', () => {
  // Initialize product display
  window.productsModule.displayProducts(window.productsModule.products);
  
  // Set up category filter buttons
  setupCategoryFilters();
  
  // Set up search functionality
  setupSearch();
  
  // Initialize any tooltips
  initializeBootstrapComponents();
});

// Function to set up category filter buttons
function setupCategoryFilters() {
  // Get all category filter buttons
  const categoryButtons = document.querySelectorAll('[data-category]');
  
  // Add click event listener to each button
  categoryButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Get selected category
      const category = this.getAttribute('data-category');
      
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter products by category
      const filteredProducts = window.productsModule.filterProductsByCategory(category);
      
      // Display filtered products
      window.productsModule.displayProducts(filteredProducts);
    });
  });
}

// Function to set up search functionality
function setupSearch() {
  // Get search form and input
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById('searchInput');
  
  // Add submit event listener to search form
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get search query
    const query = searchInput.value;
    
    // Search products
    const searchResults = window.productsModule.searchProducts(query);
    
    // Display search results
    window.productsModule.displayProducts(searchResults);
    
    // Reset category filter active state
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Set "All" category as active
    document.querySelector('[data-category="all"]').classList.add('active');
  });
  
  // Add input event listener for real-time search results
  searchInput.addEventListener('input', function() {
    if (this.value.length >= 3 || this.value.length === 0) {
      const query = this.value;
      const searchResults = window.productsModule.searchProducts(query);
      window.productsModule.displayProducts(searchResults);
    }
  });
}

// Function to initialize Bootstrap components
function initializeBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Close the mobile navbar if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
          }
        }
      }
    });
  });
}
