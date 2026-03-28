import { ProductCard } from "./Components/card.js";
import { logout, getCurrentUser } from "../auth/auth.js";

const currentUser = getCurrentUser();
const displayUsername = document.getElementById("displayUsername");
const displayEmail = document.getElementById("displayEmail");
const logbutton = document.getElementById("logbutton");
const cartbutton = document.getElementById("cart-btn");


const cartKey = `cart_${currentUser.username}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// --- Updated Cart Badge Logic ---

function updateBadge() {
  const badge = document.getElementById("cart-count"); // Ensure this matches your HTML ID
  
  if (badge) {
    // We only care about how many objects (unique IDs) are in the array
    const uniqueItemsCount = cart.length; 
    
    badge.textContent = uniqueItemsCount;
    
    // Hide the badge if the cart is empty (0)
    badge.style.display = uniqueItemsCount > 0 ? "block" : "none";
  }
}

// Call it immediately so it shows the count on page load
updateBadge();

window.addToCart = (id, title, price, image) => {
  // GUARD CLAUSE: Check login ONLY when someone clicks the button
  if (!currentUser) {
    alert("Please login to add items to your cart!");
    window.location.href = "../auth/Login.html";
    return; // This return is now safe because it's inside a function!
  }

  // If logged in, proceed
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }

  localStorage.setItem("shopping_cart", JSON.stringify(cart));
  updateBadge();
  
  alert(`${title} added to cart!`);
};

if (!currentUser) {
  displayUsername.textContent = "Guest";
  displayEmail.textContent = "";
  logbutton.textContent = "Login";
} else {
  displayUsername.textContent = currentUser.username;
  logbutton.textContent = "Logout";
}

document.getElementById("log-btn").addEventListener("click", () => {
  if (!currentUser) {
  window.location.href = "../auth/Login.html";
} else {
  logout();
  window.location.href = "Home.html";
}
  
});

const button = document.getElementById("fbutton");
const categoryFilter = document.getElementById("category-filter");
const minPriceInput = document.getElementById("min-price"); // Matches HTML ID
const maxPriceInput = document.getElementById("max-price"); // Matches HTML ID
const panel = document.getElementById("cardcontainer");



async function getTitle() {
  const categoryId = categoryFilter.value;
  const minPrice = minPriceInput.value || 1; // Default to 0 if empty
  const maxPrice = maxPriceInput.value || 9999; // Default to 9999 if empty

  // offset=0&limit=50 ensures we get plenty of data to meet the "not less than 25" rule
  let url = `https://api.escuelajs.co/api/v1/products`;

  if (categoryId) url += `?categoryId=${categoryId}`;
  if (minPrice) url += `${url.includes('?') ? '&' : '?'}price_min=${minPrice}`;
  if (maxPrice) url += `${url.includes('?') ? '&' : '?'}price_max=${maxPrice}`;

  panel.innerHTML = `<p class="col-span-full text-center py-10">Searching for products...</p>`;

  try {
    const response = await fetch(url);
    const products = await response.json();

    if (!products || products.length === 0) {
      panel.innerHTML = `<p class="col-span-full text-center py-10 text-gray-500">No products found matching those filters.</p>`;
      return;
    }

    // Render cards
    panel.innerHTML = products.map((p) => ProductCard(p)).join("");
    
  } catch (error) {
    console.error("Fetch error:", error);
    panel.innerHTML = `<p class="col-span-full text-red-500 text-center">Error connecting to store.</p>`;
  }
}

button.addEventListener("click", getTitle);
categoryFilter.addEventListener("change", getTitle);
cartbutton.addEventListener("click", () => {
  window.location.href = "Cart.html";
});

// Load 25+ products automatically on start
getTitle();