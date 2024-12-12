import { Router } from "express";
import {
    httpCreateNewCart,
    httpAddProductsToCart,
    httpGetAllCarts,
    httpGetCartById,
    htttpDeleteAllProductsFromCart,
    httpDeleteCartById,
    httpRemoveOneProductFromCart,
    httpUpdateProductQuantityInCart } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", httpCreateNewCart);

cartRouter.put("/:cid", httpAddProductsToCart);

cartRouter.put("/:cid/products/:pid", httpUpdateProductQuantityInCart);

cartRouter.get("/:cid", httpGetCartById);

cartRouter.get("/", httpGetAllCarts);

cartRouter.delete("/:cid", httpDeleteCartById);

cartRouter.delete("/:cid/products", htttpDeleteAllProductsFromCart );

cartRouter.delete("/:cid/products/:pid", httpRemoveOneProductFromCart);

export default cartRouter;