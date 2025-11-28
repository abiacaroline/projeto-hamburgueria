const cartModal = document.getElementById("cart-modal")
const cartBtn = document.getElementById("cart-btn")

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});