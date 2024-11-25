const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    console.log(data);
    const products = data.payload;

    let productsHTML = "";

    // Aca decidi dejar una lista simple con solo el Id y el nombre del producto.
    // En real time si agregue mas campos a mostrar.
    products.forEach( (product) => {
        productsHTML += `<li> ID: ${product.id} - Nombre: ${product.title} </li>`; });

    productsList.innerHTML = productsHTML;
};

btnRefreshProductsList.addEventListener("click", ()=> {
    loadProductsList();
    console.log("Lista Actualizada");
});

loadProductsList();