import CartModel from "../models/cart.model.js";

const cartInstance = new CartModel();

export const httpAddNewCart = async (req, res) => {
    try {
        const newCart = await cartInstance.addNewCart();

        res.status(201).json({ message: "Product added", payload: newCart });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpGetAllCarts = async (req, res) => {
    try {
        const carts = await cartInstance.getAllCarts();
        res.status(200).json({
            message: "This are all the carts",
            payload: carts });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpGetCartById = async (req, res) => {
    try {
        const currentCart = await cartInstance.getCartById(req.params.cid);

        res.status(200).json({ message: "This is the cart you requested", payload: currentCart });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpAddProductToCart = async (req, res) => {
    try {
        const updatedCart = await cartInstance.addProductToCart(req.params.cid, req.params.pid);

        res.status(200).json({ messsage: "Cart updated", payload: updatedCart });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const htttpDeleteCartById = async (req, res) => {
    try {
        const cart = await cartInstance.deleteCartById(req.params.cid);

        res.status(200).json({ message: "Cart Deleted", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};