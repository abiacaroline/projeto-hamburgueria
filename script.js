const cartModal = document.getElementById("cart-modal")
const cartBtn = document.getElementById("cart-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const menu = document.getElementById("menu")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const cartCounter = document.getElementById("cart-count")

let cart = []

cartBtn.addEventListener("click", () => {
  updateCartModal()
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

menu.addEventListener("click", (event) => {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
  updateCartModal()
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-bold">${item.name}</p>
        <p>Quantidade: (<span class="font-bold">${item.quantity}</span>)</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>     
      </div> 
            <button class="remove-from-cart-btn text-red-500 hover:underline"  data-name="${
              item.name
            }">
             Remover
            </button> 
    </div>
    `;

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCounter.innerHTML = totalItems;
}