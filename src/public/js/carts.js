const cartList = document.getElementById("cart-list");
const btnRefreshCart = document.getElementById("btn-refresh-cart-list");

const loadCart = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();

    const cart = data.payload.docs ?? [];
};

btnRefreshCart.addEventListener("click", ()=> {
    loadCart();
});