// Products Data
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 24.99,
    image: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg",
    category: "clothing",
    description: "Essential white t-shirt made from premium cotton for everyday comfort.",
    inStock: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    category: "clothing",
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    inStock: true
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 89.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "accessories",
    description: "Stylish and practical leather crossbody bag with adjustable strap.",
    inStock: true
  },
  {
    id: 4,
    name: "Running Sneakers",
    price: 79.99,
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
    category: "footwear",
    description: "Lightweight running sneakers with cushioned soles for maximum comfort.",
    inStock: true
  },
  {
    id: 5,
    name: "Oversized Denim Jacket",
    price: 69.99,
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
    category: "clothing",
    description: "Trendy oversized denim jacket perfect for layering.",
    inStock: true
  },
  {
    id: 6,
    name: "Minimalist Watch",
    price: 119.99,
    image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
    category: "accessories",
    description: "Elegant minimalist watch with leather strap and quartz movement.",
    inStock: true
  },
  {
    id: 7,
    name: "Summer Floral Dress",
    price: 49.99,
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg",
    category: "clothing",
    description: "Light and breezy floral dress, perfect for summer days.",
    inStock: true
  },
  {
    id: 8,
    name: "Classic Leather Boots",
    price: 129.99,
    image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg",
    category: "footwear",
    description: "Durable leather boots with classic styling and comfortable fit.",
    inStock: true
  },
  {
    id: 9,
    name: "Wool Scarf",
    price: 34.99,
    image: "https://images.pexels.com/photos/45252/hat-melons-winter-black-white-45252.jpeg",
    category: "accessories",
    description: "Soft wool scarf to keep you warm and stylish during colder months.",
    inStock: true
  },
  {
    id: 10,
    name: "Cotton Hoodie",
    price: 44.99,
    image: "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg",
    category: "clothing",
    description: "Comfortable cotton hoodie with front pocket and adjustable hood.",
    inStock: true
  },
  {
    id: 11,
    name: "Aviator Sunglasses",
    price: 89.99,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
    category: "accessories",
    description: "Classic aviator sunglasses with UV protection and metal frame.",
    inStock: true
  },
  {
    id: 12,
    name: "Canvas Sneakers",
    price: 39.99,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    category: "footwear",
    description: "Versatile canvas sneakers for casual everyday wear.",
    inStock: true
  }
];

// Function to display products
function displayProducts(productsToDisplay) {
  const productsContainer = document.getElementById('productsList');
  
  // Clear the container
  productsContainer.innerHTML = '';
  
  // Check if there are products to display
  if (productsToDisplay.length === 0) {
    productsContainer.innerHTML = '<div class="col-12 text-center"><p>No products found matching your search.</p></div>';
    return;
  }
  
  // Loop through products and create HTML for each
  productsToDisplay.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-6 col-lg-4 col-xl-3 fade-in';
    productCard.setAttribute('data-category', product.category);
    
    productCard.innerHTML = `
      <div class="card product-card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <p class="product-category mb-1">${product.category}</p>
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text flex-grow-1">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="fw-bold">$${product.price.toFixed(2)}</span>
            <button class="btn btn-primary btn-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    
    productsContainer.appendChild(productCard);
  });
  
  // Add event listeners to the newly created "Add to Cart" buttons
  document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      addToCart(productId);
    });
  });
}

// Function to filter products by category
function filterProductsByCategory(category) {
  if (category === 'all') {
    return products;
  } else {
    return products.filter(product => product.category === category);
  }
}

// Function to search products
function searchProducts(query) {
  if (!query || query.trim() === '') {
    return products;
  }
  
  query = query.toLowerCase().trim();
  return products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
}

// Export functions and data for use in other files
window.productsModule = {
  products,
  displayProducts,
  filterProductsByCategory,
  searchProducts
};
