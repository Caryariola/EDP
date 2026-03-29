import { CartItem } from "./Components/cartitem.js";
import { getCurrentUser, logout } from "../auth/auth.js";

const currentUser = getCurrentUser();
const cartContainer = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 1. Define UI elements globally so they are reachable
const displayUsername = document.getElementById("displayUsername");
const logname = document.getElementById("logbutton");
const logbtn = document.getElementById("log-btn");

function initCart() {
  if (!currentUser) {
    alert("Please login to view your cart!");
    window.location.href = "../auth/Login.html";
    return;
  }

  if (displayUsername) displayUsername.textContent = currentUser.username;
  if (logname) logname.textContent = "Logout";

  const cartKey = `cart_${currentUser.username}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  function updateBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) {
      const count = cart.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? "block" : "none";
    }
  }

  function renderCart() {
    if (!cartContainer) return;
    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-center py-20 text-gray-500">Your cart is empty.</p>`;
      if (totalPriceElement) totalPriceElement.textContent = "$0.00";
      updateBadge(); // Keep badge in sync
      return;
    }

    cartContainer.innerHTML = cart.map((item) => CartItem(item)).join("");
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    if (totalPriceElement)
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    updateBadge();
  }

  // --- Actions ---
  window.changeQty = (id, amount) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.quantity += amount;
      // If quantity is 0 or less, call the removeItem function
      if (item.quantity <= 0) {
        window.removeItem(id);
      } else {
        saveAndRefresh();
      }
    }
  };

  window.removeItem = (id) => {
    cart = cart.filter((item) => item.id !== id);
    saveAndRefresh();
  };

  function saveAndRefresh() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart(); // This now calls updateBadge() inside it
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveAndRefresh();
      }
    });
  }

  renderCart();
}

logbtn.addEventListener("click", () => {
  if (!currentUser) {
    window.location.href = "../auth/Login.html";
  } else {
    logout();
    window.location.href = "../auth/Login.html";
  }
});

initCart();
