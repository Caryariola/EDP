import { ProductCard } from "./Components/card.js";
import { logout, getCurrentUser } from "../auth/auth.js";

      const currentUser = getCurrentUser();
      const displayUsername = document.getElementById("displayUsername");
      const displayEmail = document.getElementById("displayEmail");

      if (!currentUser) {
        alert("Access Denied. Please log in first.");
        window.location.href = "auth/Login.html";
      } else {
        displayUsername.textContent = currentUser.username;
        displayEmail.textContent = currentUser.email;
      }

      document.getElementById("logout-btn").addEventListener("click", () => {
        logout();
        window.location.href = "auth/Login.html";
      });
