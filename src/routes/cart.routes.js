import { Router } from "express";

// Asignando la instancia de router de express a una variable
const cartRouter = Router();

// Ruta para traer todos los productos
cartRouter.get("/");

// Ruta para traer un producto por su ID
cartRouter.get("/:cid");

cartRouter.post("/");

export default cartRouter;