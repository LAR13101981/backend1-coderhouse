import ErrorHandler from "../utils/error.handler.js";
import CartModel from "../models/cart.schema.js";
import { isValidID } from "../config/mongoose.config.js";

export default class CartManager {
    #cartModel;

    constructor() {
        this.#cartModel = CartModel;
    }

    async #findCartById(id){
        if (!isValidID(id)){
            throw new ErrorHandler("El Id no es valido.", 400);
        }

        const selectedCart = await this.#cartModel.findById(id).populate("products.product");

        if (!selectedCart){
            throw new ErrorHandler(`No se encontro un carrito con el Id:${id}`, 404);
        }

        return selectedCart;
    }

    async getAllCarts(params){
        try {
            const paginationOptions = {
                limit: params?.limit || 5,
                page: params?.page || 1,
                populate: "products.product",
                lean: true,
            };

            const carts = await this.#cartModel.paginate( {}, paginationOptions);

            if (!carts){
                throw new ErrorHandler("No existen carritos", 404);
            }

            return carts;
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    async getCartById(id){
        try {
            return await this.#findCartById(id);
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    async createNewCart(data){
        try {
            const newCart = await this.#cartModel.create(data);
            return newCart;
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    async addProductToCart(cartId, productId){
        try {
            const selectedCart = await this.#findCartById(cartId);
            const productIndex = selectedCart.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                selectedCart.products[productIndex].quantity++;
            } else {
                selectedCart.products.push({ product: productId, quantity: 1 });
            }

            await selectedCart.save();

            return selectedCart;
        } catch (error) {
            throw new ErrorHandler(error);
        }

    }

    async removeProductFromCart(cartId, productId){
        try {
            const selectedCart = await this.#findCartById(cartId);
            const productIndex = selectedCart.products.findIndex((item) => item.product.toString() === productId);

            if (productIndex < 0){
                throw new ErrorHandler(`No existe un producto con el Id ${productId} en el carrito`, 404);
            }

            selectedCart.products.splice(productIndex, 1);

            await selectedCart.save();
            return selectedCart;
        } catch(error){
            throw new ErrorHandler(error);
        }
    }

    async deleteAllProductsFromCart(cartId){
        try {
            const selectedCart = await this.#findCartById(cartId);

            selectedCart.products = [];

            await selectedCart.save();

            return { message: `Los productos del carrito con el Id: ${cartId} fueron borrados.` };

        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

}