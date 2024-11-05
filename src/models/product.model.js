import paths from "../utils/paths";
import ErrorHandler from "../utils/error.handler";
import { readJsonFile, writeJsonFile } from "../utils/file.handler";

export default class ProductModel {
    #jsonFilename;
    #products;

    constructor(){
        this.#jsonFilename = "products.json";
    }

    // Busca un carrito por su ID
    async #findProductById(id) {
        try {
            this.#products = await this.getAllProducts();
            const cartFound = this.#products.find((item) => item.id === Number(id));

            if (!cartFound){
                throw new ErrorHandler("No se encontro ningun producto con ese Id", 404);
            }

            return cartFound;
        } catch (error) {
            throw new error;
        }
    }

    async getAllProducts(){
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    async getProductById(id){
        try {
            const cartFound = await this.#findProductById(id);
            return cartFound;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    async addProduct(data, file){
        try {
            const { title, description, code, price, status, stock, category } = data;

            if (!title || !status || !stock){
                throw new ErrorHandler("Faltan datos obligatorios", 400);
            }

            if (!file?.filename){
                throw new ErrorHandler("Falta el archivo de la imagen", 400);
            }

            const newProduct = {
                id: generateId(await this.getAllProducts()),
                title,
                description,
                code,
                price: Number(price),
                status: convertToBoolean(status),
                stock: Number(stock),
                category,
                thumbnail: file?.filename,
            };

            this.#products.push(newProduct);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return newProduct;
        } catch (error) {
            if (file?.filename) awaite;
        }
    }
}