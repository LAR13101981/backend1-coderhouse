import { Router } from "express";

// Asignando la instancia de router de express a una variable
const cartRouter = Router();

// Ruta para crea un carrito 
cartRouter.post("/");
// Ruta para agregar productos a un carrito existente
cartRouter.post("/:cid/product/:pid");
// Ruta para traer un producto por su ID
cartRouter.get("/:cid");

export default cartRouter;