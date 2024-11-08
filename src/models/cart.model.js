import paths from "../utils/paths.js";
import ErrorHandler from "../utils/error.handler.js";
import { readJsonFile, writeJsonFile } from "../utils/file.handler.js";
import { generateId } from "../utils/collection.handler.js";

export default class CartModel {
    #jsonFilename;
    #carts;
    constructor(){
        this.#jsonFilename = "carrito.json";
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

    async addNewCart(){
        try {
            const newCart = {
                id: generateId(await this.getAllCarts()),
                carts: [],
            };

            this.#carts.push(newCart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return newCart;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }

    }

    async addProductToCart(){}

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