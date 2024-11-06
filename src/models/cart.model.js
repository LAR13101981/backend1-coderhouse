import paths from "../utils/paths";
import ErrorHandler from "../utils/error.handler";
import { readJsonFile } from "../utils/file.handler";

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
            const cartFound = this.#carts.find((item) => item.id === Number(id));

            if (!cartFound){
                throw new ErrorHandler(`No se encontro un carrito con el Id:${id}`, 404);
            }

            return cartFound;
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
            const cartFound = await this.#findCartById(id);
            return cartFound;

        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    async addNewCart(){}

    async updateExistingCart(){}

    async deleteCartById(){}
}