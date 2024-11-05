import { Router } from "express";

// Asignando la instancia de router de express a una variable
const productRouter = Router();

// Ruta para traer todos los productos
productRouter.get("/");

// Ruta para traer un producto por su ID
productRouter.get("/:pid");

productRouter.post("/", httpCreateProduct);

export default productRouter;