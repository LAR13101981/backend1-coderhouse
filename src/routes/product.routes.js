import { Router } from "express";
import { htppGetProductById, httpGetAllproducts, httpCreateProduct, httpUpdateProductById, httpDeleteProductById } from "../controllers/product.controller.js";

// Asignando la instancia de router de express a una variable
const productRouter = Router();

// Ruta para crear un producto
productRouter.post("/", httpCreateProduct);
// Ruta para traer todos los productos
productRouter.get("/", httpGetAllproducts);
// Ruta para traer un producto por su ID
productRouter.get("/:pid", htppGetProductById);
// Ruta para elminar un producto por su ID
productRouter.delete("/:pid", httpDeleteProductById);
// Ruta para actualizar un producto por su ID
productRouter.put("/:pid", httpUpdateProductById);

export default productRouter;