
const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("refresh-btn");
const btnGoToCart = document.getElementById("goto-cart-btn");
const btnFirstPage = document.getElementById("first-page");
const btnPreviousPage = document.getElementById("previous-page");
const btnNextPage = document.getElementById("next-page");
const btnLastPage = document.getElementById("last-page");
const currentPageDisplay = document.getElementById("current-page");

let currentPage = 1;
let totalPages;
const itemsPerPage = 4;

const loadProductsList = async (page = 1) => {
    const response = await fetch(`/api/products?page=${page}&limit=${itemsPerPage}`, { method: "GET" });
    const data = await response.json();

    const products = data.payload.docs ?? [];
    totalPages = data.payload.totalPages;
    currentPage = data.payload.page || 1;

    productsList.innerHTML = products.map((product) =>`
        <tr>
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>$${product.price}</td>            
            <td>${product.availability ? "🟢" : "🔴"}</td>
            <td><input type="number" id="quantity-${product._id}" name="quantity"></td>
            <td class="controls-btns">
                <button class="add-to-cart-btn" data-id="${product._id}">Agregar al Carrito</button>
                <button class="view-details-btn" data-id="${product._id}">Ver Detalles</button>
            </td>
        </tr>
    `).join("");

    updatePaginationInfo();
};

const updatePaginationInfo = () => {
    currentPageDisplay.textContent = `Página ${currentPage}`;
    btnFirstPage.disabled = currentPage === 1;
    btnPreviousPage.disabled = currentPage === 1;
    btnNextPage.disabled = currentPage === totalPages;
    btnLastPage.disabled = currentPage === totalPages;
};

btnFirstPage.addEventListener("click", () => {
    if (currentPage > 1) loadProductsList(1);
});

btnPreviousPage.addEventListener("click", () => {
    if (currentPage > 1) loadProductsList(currentPage - 1);
});

btnNextPage.addEventListener("click", () => {
    if (currentPage < totalPages) loadProductsList(currentPage + 1);
});

btnLastPage.addEventListener("click", () => {
    if (currentPage < totalPages) loadProductsList(totalPages);
});

document.addEventListener("DOMContentLoaded", () => {
    btnGoToCart.addEventListener("click", ()=> {
        window.location.href = "/cart";
    });
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("view-details-btn")) {
        const productId = event.target.getAttribute("data-id");
        window.location.href = `/productDetails?productId=${productId}`;
    }
});

btnRefreshProductsList.addEventListener("click", () => {
    loadProductsList();
});

loadProductsList();