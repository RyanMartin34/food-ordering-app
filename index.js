import { menuItems } from "./data/menu-items.js";

// Declare Variables
const menuSection = document.getElementById("menu-section");
const checkoutSummary = document.getElementById("checkout-summary");
const totalPrice = document.getElementById("total-price");
const checkoutSection = document.getElementById("checkout-section");
const completeOrderBtn = document.getElementById("complete-order-btn");
const payBtn = document.getElementById("payment-dialog-button");
const paymentDialog = document.getElementById("payment-dialog");
const paymentForm = document.getElementById("payment-form");
const thankYouSection = document.getElementById("thank-you-section");
const thankYouMessage = document.getElementById("thank-you-message");
let cart = [];

// Event Listeners
document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    addToCart(e.target.dataset.id);
  } else if (e.target.dataset.idremove) {
    removeFromCart(e.target.dataset.idremove);
  } else if (completeOrderBtn) {
    showPaymentDialog();
  } else if (payBtn) {
    closePaymentDialog();
  }
});

paymentForm.addEventListener("submit", function (e) {
  showMessage(e);
});

// Functions
function renderMenu() {
  const menuHtml = menuItems
    .map(function (menuItem) {
      return `
        <div class="menu-item">
    
            <div class="menu-item-image">
            <p>${menuItem.emoji}</p>
            </div>
    
            <div class="menu-item-text">
                <h2 class="menu-item-text-name">${menuItem.name}</h2>
                <p class="menu-item-text-ingredients">${menuItem.ingredients}</p>
                <p class="menu-item-text-price">$${menuItem.price}</p>
            </div>
    
            <div class="menu-item-button">
                <button data-id="${menuItem.id}">+</button>
            </div>
    
        </div>
        `;
    })
    .join("");

  menuSection.innerHTML = menuHtml;
}

function addToCart(selectedItem) {
  const selectedItemObject = menuItems.find(function (menuItem) {
    return menuItem.id === Number(selectedItem);
  });

  if (selectedItemObject) {
    cart.unshift(selectedItemObject);
    checkoutSection.classList.remove("hidden");
  }

  renderCart();
  renderTotal();
}

function removeFromCart(removedItem) {
  const itemIndex = cart.findIndex(function (menuItem) {
    return menuItem.id === Number(removedItem);
  });

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }

  if (cart.length === 0) {
    checkoutSection.classList.add("hidden");
  }

  renderCart();
  renderTotal();
}

function renderCart() {
  const cartHtml = cart
    .map(function (cartItem) {
      return `
    <div class="cart-item">
        <p class="cart-item-name">${cartItem.name}</p>
        <p class="cart-item-remove" data-idremove="${cartItem.id}">remove</p>
        <p class="cart-item-price">$${cartItem.price}</p>
        </div>
    `;
    })
    .join("");
  checkoutSummary.innerHTML = cartHtml;
}

function renderTotal() {
  const orderTotal = cart.reduce(function (total, currentItem) {
    return total + currentItem.price;
  }, 0);

  totalPrice.innerHTML = `$${orderTotal}`;
}

function showPaymentDialog() {
  paymentDialog.showModal();
}

function showMessage(e) {
  e.preventDefault();
  paymentDialog.close();
  checkoutSection.classList.add("hidden");
  thankYouSection.classList.remove("thank-you-section-hidden");

  const userName = document.getElementById("user-name").value;

  thankYouMessage.textContent = `Thanks, ${userName}! Your order is on its way!`;
}

renderMenu();
