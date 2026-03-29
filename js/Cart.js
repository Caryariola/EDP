import { CartItem } from "./Components/cartitem.js";

const cartContainer = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");

// 1. Load Data
const cartKey = `cart_${currentUser.id}`;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// 2. Render Function
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center py-20 text-gray-500">Your cart is empty.</p>`;
    totalPriceElement.textContent = "$0.00";
    return;
  }

  // Use the component for each item
  cartContainer.innerHTML = cart.map(item => CartItem(item)).join("");
  
  // Update Total Cost
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// 3. Global Actions (for the buttons in the component)
window.changeQty = (id, amount) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += amount;
    if (item.quantity <= 0) return removeItem(id); // Remove if qty hits 0
    saveAndRefresh();
  }
};

window.removeItem = (id) => {
  cart = cart.filter(item => item.id !== id);
  saveAndRefresh();
};

function saveAndRefresh() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

// Initial Run
renderCart();