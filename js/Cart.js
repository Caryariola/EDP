import { CartItem } from "./Components/cartitem.js";
import { getCurrentUser, logout } from "../auth/auth.js";

const currentUser = getCurrentUser();
const cartContainer = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart-btn");
const displayUsername = document.getElementById("displayUsername");
const logname = document.getElementById("logbutton");
const logbtn = document.getElementById("log-btn");
const checkoutBtn = document.getElementById("check-out");

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
      updateBadge(); 
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

  window.changeQty = (id, amount) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.quantity += amount;
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
    renderCart(); 
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveAndRefresh();
      }
    });
  }

  async function handleCheckout() {
    if (cart.length === 0) return alert("Cart is empty!");

    const orderPayload = {
      user: {
        username: currentUser.username,
        email: currentUser.email, 
      },
      cart: [...cart], 
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };

    const originalText = checkoutBtn.textContent;
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Processing Order...";

    console.log("Sending Payload to 'Server':", orderPayload);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        const checkoutkey = `orders_history_${currentUser.username}`;
        const orders = JSON.parse(localStorage.getItem(checkoutkey)) || [];
        orders.push(orderPayload);
        localStorage.setItem(checkoutkey, JSON.stringify(orders));

        cart = [];
        localStorage.setItem(
          `cart_${currentUser.username}`,
          JSON.stringify(cart),
        );

        alert("Order Successful! Thank you for your purchase.");
        window.location.href = "Home.html";
      } else {
        alert("Payment failed. Please check your card and try again.");
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = originalText;
      }
    }, 4000); 
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }

  renderCart();
}

if (logbtn) {
    logbtn.addEventListener("click", () => {
        if (!currentUser) {
            window.location.href = "../auth/Login.html";
        } else {
            logout(); 
            window.location.href = "../auth/Login.html";
        }
    });
}

initCart();
