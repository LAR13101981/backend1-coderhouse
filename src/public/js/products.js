
const productsList = document.getElementById("products-list");
//const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();

    const products = data.payload;

    //let productsHTML = "";

    //products.forEach( (product) => {
    //    productsHTML += `<li> ID: ${product._id} - Nombre: ${product.title} - Precio: ${product.price} </li>`; });

    productsList.innerHTML = products.map((product) =>`
        <tr>
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.availability ? "🟢" : "🔴"}</td>
            <td class="controls-btns">
                <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
                <button onclick="viewDetails(${product.id})">Ver Detalles</button>
            </td>
        </tr>
    `).join("");
};

loadProductsList();

/*
let products = [];
let currentPage = 1;
let totalPages = 3;
let productsPerPage = 5;

const productsList = document.getElementById('products-list');
const firstPageBtn = document.getElementById('first-page');
const previousPageBtn = document.getElementById('previous-page');
const nextPageBtn = document.getElementById('next-page');
const lastPageBtn = document.getElementById('last-page');

function fetchProducts(page) {
    // Mock fetching data, you can replace this with an actual API request
    products = [
        { id: 1, name: "Producto 1", price: 10, stock: 100, availability: true },
        { id: 2, name: "Producto 2", price: 20, stock: 50, availability: false },
        // Add more mock products as needed for testing pagination
    ];

    totalPages = Math.ceil(products.length / productsPerPage);
    currentPage = page;

    renderProducts();
    updatePagination();
}

function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    productsList.innerHTML = currentProducts.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.availability ? 'Sí' : 'No'}</td>
            <td class="controls-btns">
                <button>Add to Cart</button>
                <button>View Details</button>
            </td>
        </tr>
    `).join('');
}

function updatePagination() {
    firstPageBtn.disabled = currentPage === 1;
    previousPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    lastPageBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        fetchProducts(page);
    }
}

// Sorting functionality
function sortBy(property) {
    if (property === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (property === 'availability') {
        products.sort((a, b) => a.availability - b.availability);
    }

    renderProducts();
}

// Event listeners for pagination buttons
firstPageBtn.addEventListener('click', () => goToPage(1));
previousPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
lastPageBtn.addEventListener('click', () => goToPage(totalPages));

// Fetch the products for the first time
fetchProducts(1);
*/