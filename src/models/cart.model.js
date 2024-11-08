import paths from "../utils/paths.js";
import ErrorHandler from "../utils/error.handler.js";
import { readJsonFile, writeJsonFile } from "../utils/file.handler.js";
import { generateId } from "../utils/collection.handler.js";
import ProductModel from "./product.model.js";

// Busque utilizar un metodo de la clase ProductModel, en esta clase, me salio toda un explicacion de
// dependency injection que me parecio complicada, asi que decidi simplemente crear una nueva instancia
// no se si es correcto o la mejor opcion, pero me resolvio lo que queria realizar que es chequear si el
// producto que paso en addProductToCart, realmente existe.
export default class CartModel {
    #jsonFilename;
    #carts;
    constructor(){
        this.#jsonFilename = "carrito.json";
        this.productModel = new ProductModel();
    }

    // Busca un carrito por su ID
    async #findCartById(id) {
        try {
            this.#carts = await this.getAllCarts();
            const currentCart = this.#carts.find((cart) => cart.id === Number(id));

            if (!currentCart){
                throw new ErrorHandler(`No se encontro un carrito con el Id:${id}`, 404);
            }

            return currentCart;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Trae todos los carritos
    async getAllCarts(){
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            console.log(this.#carts);
            return this.#carts;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Trae un carrito especifico por su Id
    async getCartById(id){
        try {
            const currentCart = await this.#findCartById(id);
            return currentCart;

        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Crea un nuevo carrito
    async addNewCart(){
        try {
            const newCart = {
                id: generateId(await this.getAllCarts()),
                products: [],
            };

            this.#carts.push(newCart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return newCart;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }

    }

    // Agrega un producto a un carrito existente, o agrega mas cantidad del producto si ya existe en el carrito.
    // Tambien chequea la existencia del carrito y del producto a sumar.
    async addProductToCart(cartId, productId){
        try {
            // Busca si el producto existe
            const productExists = await this.productModel.getProductById(productId);

            if (!productExists){
                throw new ErrorHandler( error.message, error.code);
            }

            const selectedCart = await this.#findCartById(cartId);

            // Buscando si el producto ya existe en el carrito
            const existingProduct = selectedCart.products.find((product)=> product.id === Number(productId));

            // Condicional si el producto existe solo suma a la cantidad
            if (existingProduct){
                existingProduct.quantity += 1;
            } else {
                selectedCart.products.push({ id: Number(productId), quantity: 1 });
            }

            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Borra todo el carrito por us Id
    async deleteCartById (id) {
        try {
            const index = this.#carts.findIndex((cart)=> cart.id === Number(id));
            this.#carts.splice(index, 1);

            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

}