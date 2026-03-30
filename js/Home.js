import { ProductCard } from "./Components/card.js";
import { logout, getCurrentUser } from "../auth/auth.js";

const currentUser = getCurrentUser();
const displayUsername = document.getElementById("displayUsername");
const displayEmail = document.getElementById("displayEmail");
const logbutton = document.getElementById("logbutton");
const cartbutton = document.getElementById("cart-btn");

const cartKey = currentUser ? `cart_${currentUser.username}` : null;
let cart = cartKey ? (JSON.parse(localStorage.getItem(cartKey)) || []) : [];

function updateBadge() {
  const badge = document.getElementById("cart-count"); 
  
  if (badge) {
    const uniqueItemsCount = cart.length; 
    badge.textContent = uniqueItemsCount;
    badge.style.display = uniqueItemsCount > 0 ? "block" : "none";
  }
}
updateBadge();

window.addToCart = (id, title, price, image) => {
  if (!currentUser) {
    alert("Please login to add items to your cart!");
    window.location.href = "../auth/Login.html";
    return; 
  }

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
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
const minPriceInput = document.getElementById("min-price"); 
const maxPriceInput = document.getElementById("max-price"); 
const panel = document.getElementById("cardcontainer");



async function getTitle() {
  const categoryId = categoryFilter.value;
  const minPrice = minPriceInput.value || 1; 
  const maxPrice = maxPriceInput.value || 9999; 

  let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=30`;

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

    panel.innerHTML = products.map((p) => ProductCard(p)).join("");
    
  } catch (error) {
    console.error("Fetch error:", error);
    panel.innerHTML = `<p class="col-span-full text-red-500 text-center">Error connecting to store.</p>`;
  }
}

button.addEventListener("click", getTitle);
categoryFilter.addEventListener("change", getTitle);
cartbutton.addEventListener("click", () => {
  if (!currentUser) {
    alert("Please login to view your cart!");
    window.location.href = "../auth/Login.html";
    return;
  } else {
    window.location.href = "Cart.html";
  }
});

getTitle();