import paths from "../utils/paths.js";
import ErrorHandler from "../utils/error.handler.js";
import { readJsonFile } from "../utils/file.handler.js";

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
            const currentCart = this.#carts.find((item) => item.id === Number(id));

            if (!currentCart){
                throw new ErrorHandler(`No se encontro un carrito con el Id:${id}`, 404);
            }

            return currentCart;
        } catch (error) {
            throw new error;
        }
    }

    async getAllCarts(){
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    async getCartById(id){
        try {
            const currentCart = await this.#findCartById(id);
            return currentCart;

        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    async addNewCart(){}

    async updateExistingCart(){}

    async deleteCartById(){}
}