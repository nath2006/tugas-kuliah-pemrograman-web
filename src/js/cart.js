// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartCountElement = document.querySelector('.cart-count');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartSummary = document.getElementById('cartSummary');
const cartSubtotalElement = document.getElementById('cartSubtotal');
const cartShippingElement = document.getElementById('cartShipping');
const cartTaxElement = document.getElementById('cartTax');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Constants
const TAX_RATE = 0.08; // 8% tax rate
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping for orders over $100
const SHIPPING_COST = 10; // $10 shipping cost for orders under the threshold

// Function to add product to cart
function addToCart(productId) {
  // Find the product in the products array
  const product = window.productsModule.products.find(p => p.id === productId);
  
  if (!product) return;
  
  // Check if product is already in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    // Increment quantity if product already in cart
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  saveCart();
  
  // Update UI
  updateCartUI();
  
  // Show success message
  showAddToCartSuccess(product.name);
  
  // Animate the cart badge
  animateCartBadge();
}

// Function to remove item from cart
function removeFromCart(productId) {
  // Filter out the item to remove
  cart = cart.filter(item => item.id !== productId);
  
  // Save cart to localStorage
  saveCart();
  
  // Update UI
  updateCartUI();
}

// Function to update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
  // Find the item in the cart
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromCart(productId);
    } else {
      // Update quantity
      cart[itemIndex].quantity = newQuantity;
      
      // Save cart to localStorage
      saveCart();
      
      // Update UI
      updateCartUI();
    }
  }
}

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to calculate cart totals
function calculateCartTotals() {
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  
  // Calculate tax
  const tax = subtotal * TAX_RATE;
  
  // Calculate total
  const total = subtotal + shipping + tax;
  
  return {
    subtotal,
    shipping,
    tax,
    total
  };
}

// Function to update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = totalItems;
  
  // Show/hide empty cart message and cart summary
  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartSummary.style.display = 'none';
    cartItemsContainer.innerHTML = '';
  } else {
    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    // Add each cart item to the container
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
          <div class="flex-grow-1">
            <h6 class="mb-0">${item.name}</h6>
            <p class="text-muted mb-0">$${item.price.toFixed(2)}</p>
            <div class="d-flex align-items-center mt-2">
              <button class="btn btn-sm btn-outline-secondary cart-quantity-btn" 
                onclick="window.cartModule.updateCartItemQuantity(${item.id}, ${item.quantity - 1})">
                -
              </button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary cart-quantity-btn"
                onclick="window.cartModule.updateCartItemQuantity(${item.id}, ${item.quantity + 1})">
                +
              </button>
            </div>
          </div>
          <div class="ms-auto">
            <p class="fw-bold mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="cart-remove-btn" onclick="window.cartModule.removeFromCart(${item.id})">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update cart totals
    const { subtotal, shipping, tax, total } = calculateCartTotals();
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    cartShippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    cartTaxElement.textContent = `$${tax.toFixed(2)}`;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Function to show add to cart success message
function showAddToCartSuccess(productName) {
  // Create toast element
  const toastContainer = document.createElement('div');
  toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
  toastContainer.style.zIndex = '1070';
  
  toastContainer.innerHTML = `
    <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i>
          ${productName} added to cart!
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  document.body.appendChild(toastContainer);
  
  // Initialize and show the toast
  const toastElement = toastContainer.querySelector('.toast');
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
  
  // Remove toast from DOM after it's hidden
  toastElement.addEventListener('hidden.bs.toast', function() {
    document.body.removeChild(toastContainer);
  });
}

// Function to animate the cart badge
function animateCartBadge() {
  cartCountElement.classList.add('animate');
  
  // Remove animation class after animation completes
  setTimeout(() => {
    cartCountElement.classList.remove('animate');
  }, 500);
}

// Function to handle checkout
function checkout() {
  // In a real application, this would redirect to a checkout page
  // or open a checkout modal
  alert('Checkout functionality would go here in a production environment.');
  
  // For this demo, we'll clear the cart after checkout
  cart = [];
  saveCart();
  updateCartUI();
  
  // Close the cart offcanvas
  const offcanvasElement = document.getElementById('cartOffcanvas');
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  offcanvas.hide();
}

// Add event listener to checkout button
checkoutBtn.addEventListener('click', checkout);

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});

// Export cart functions for use in other files
window.cartModule = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateCartTotals
};
