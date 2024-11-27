// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const errorMessage = document.getElementById("error-message");
const imputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");

socket.on("products-list", (data) => {
    const products = data.products ?? [];
    productsList.innerText = "";

    products.forEach((product) => {
        // Campos a mostrar en la lista de los productos en tiempo real.
        // Decidi mostrar solo los atributos que considere mas relevantes sobre el producto.
        productsList.innerHTML += `<li> Id: ${product.id}<br>
    Nombre: ${product.title}<br>
    Precio: $ ${product.price}<br>
    Stock: ${product.stock}<br>
    Laboratorio: ${product.category} </li>`;
    });
});

productsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    const productData = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        status: formData.get("status"),
        stock: formData.get("stock"),
        category: formData.get("category"),
    };

    const file = formData.get("thumbnails");

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const fileData = reader.result; // Base64 string or binary
            console.log("Sending file data". fileData);
            socket.emit("add-product", { productData, fileData });
        };
        reader.readAsDataURL(file); // Use Base64 encoding
    } else {
        socket.emit("add-product", { productData, fileData: null });
    }

    form.reset();

});

btnDeleteProduct.onclick = () => {
    const id = Number(imputProductId.value);
    imputProductId.value = "";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-product", { id });
    }
};

socket.on("error-message", (data) =>{
    errorMessage.innerText = data.message;
});

// Evento que se activa al conectar con el servidor
socket.on("connect", () => {
    // Indica que la conexión fue exitosa
    console.log("Conectado al Server");
});

// Evento que se activa al desconectarse del servidor
socket.on("disconnect", () => {
    // Indica que se perdió la conexión
    console.log("Se desconecto del server");
});