import { Server } from "socket.io";
import ProductModel from "../models/product.model.js";

const productInstance = new ProductModel();
// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexion establecida", socket.id);
        socketServer.emit("products-list", { products: await productInstance.getAllProducts() });

        // Escucha si se agrega algun producto desde el cliente
        socket.on("add-product", async (data) => {
            try {
                await productInstance.addNewProduct(data);

                socketServer.emit("products-list", { products: await productInstance.getAllProducts() });

            } catch (error) {

                socketServer.emit("error-message", { message: error.message });
            }
        });

        socket.on("delete-product", async (data)=>{
            try {
                await productInstance.deleteProductById(data.id);

                socketServer.emit("products-list", { products: await productInstance.getAllProducts() });

            } catch (error) {
                socketServer.emit("error-message", { message: error.message });
            }
        });
    });

};