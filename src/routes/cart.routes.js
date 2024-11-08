import { Router } from "express";
import { httpAddNewCart, httpAddProductToCart, httpGetAllCarts, httpGetCartById, htttpDeleteCartById } from "../controllers/cart.controller.js";

// Asignando la instancia de router de express a una variable
const cartRouter = Router();

// Ruta para crea un carrito 
cartRouter.post("/", httpAddNewCart);
// Ruta para agregar productos a un carrito existente
cartRouter.post("/:cid/product/:pid", httpAddProductToCart);
// Ruta para traer un producto por su ID
cartRouter.get("/:cid", httpGetCartById);
// Ruta pra traer todos los carritos
cartRouter.get("/", httpGetAllCarts);
// Borra un carrito por su Id
cartRouter.delete("/:cid", htttpDeleteCartById );

export default cartRouter;