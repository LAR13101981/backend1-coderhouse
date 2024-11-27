import { Server } from "socket.io";
import ProductModel from "../models/product.model.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import paths from "../utils/paths.js";
import { generateNameForFile } from "../utils/random.js";

const productInstance = new ProductModel();
// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexion establecida", socket.id);
        socketServer.emit("products-list", { products: await productInstance.getAllProducts() });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Escucha si se agrega algun producto desde el cliente
        socket.on("add-product", async ({ productData, fileData }) => {
            try {
                let fileInfo = null;

                if (fileData) {
                    // Extract the file extension from the Base64 data URL
                    const matches = fileData.match(/^data:image\/(.*?);base64,/);
                    const fileExtension = matches ? matches[1] : "jpg";

                    // Generate a unique file name using generateNameForFile with the extracted extension
                    const fileName = generateNameForFile(`file.${fileExtension}`);

                    // Resolve the path from the root of the project
                    const filePath = path.resolve(__dirname, paths.images, fileName);

                    // Remove the Base64 prefix and write the file to disk
                    const base64Data = fileData.replace(/^data:image\/.*?;base64,/, "");
                    fs.writeFileSync(filePath, base64Data, "base64"); // Save the file

                    fileInfo = { filename: fileName }; // Mimic Multer's output for consistency
                }

                await productInstance.addNewProduct(productData, fileInfo);

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