const productId = new URLSearchParams(window.location.search).get("productId");

const getProductDetails = async (id) => {
    const response = await fetch(`/api/products/${id}`, { method: "GET" });

    if(!response.ok) throw new Error("Failed to fetch product details");
    return response.json();
};

const loadProductDetails = async () => {
    try {
        const fullProduct = await getProductDetails(productId);

        const product = fullProduct.payload;
        console.log(product.title);

        document.getElementById("product-id").textContent = product._id;
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-name").textContent = product.title;
        document.getElementById("product-price").textContent = product.price;
        document.getElementById("product-code").textContent = product.code;
        document.getElementById("product-stock").textContent = product.stock;
        document.getElementById("product-category").textContent = product.category;
        document.getElementById("product-status").textContent = product.status;
        document.getElementById("product-availability").textContent = product.availability ? "Disponible" : "No Disponible";
        document.getElementById("product-description").textContent = product.description || "Sin descripción";

        const productImage = document.getElementById("product-image");
        if (product.image) {
            productImage.src = product.image;
            productImage.style.display = "block";
        } else {
            productImage.style.display = "none";
        }
    } catch (error) {
        console.error("Error loading product details:", error);
    }
};

loadProductDetails();

document.getElementById("back-to-products").addEventListener("click", () => {
    window.location.href = "/";
});