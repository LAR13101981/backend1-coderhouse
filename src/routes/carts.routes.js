import { Router } from "express";
import {
    httpCreateNewCart,
    httpAddProductToCart,
    httpGetAllCarts,
    httpGetCartById,
    htttpDeleteAllProductsFromCart,
    httpRemoveProductFromCart } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", httpCreateNewCart);

cartRouter.put("/:cid/product/:pid", httpAddProductToCart);

cartRouter.get("/:cid", httpGetCartById);

cartRouter.get("/", httpGetAllCarts);

cartRouter.delete("/:cid", htttpDeleteAllProductsFromCart );

cartRouter.delete("/:cid/product/:pid", httpRemoveProductFromCart);

export default cartRouter;