import paths from "../utils/paths.js";
import ErrorHandler from "../utils/error.handler.js";
import { readJsonFile, writeJsonFile, deleteJsonFile } from "../utils/file.handler.js";
import { convertToBoolean } from "../utils/converter.js";
import { generateId } from "../utils/collection.handler.js";

export default class ProductModel {
    #jsonFilename;
    #products;

    constructor(){
        this.#jsonFilename = "productos.json";
    }

    // Busca un producto por su ID
    async #findProductById(id) {
        try {
            this.#products = await this.getAllProducts();
            const currentProduct = this.#products.find((product) => product.id === Number(id));

            if (!currentProduct){
                throw new ErrorHandler(`No se encontro un producto con el Id:${id}`, 404);
            }

            return currentProduct;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Trae todos los productos
    async getAllProducts(){
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Trae un producto especifico por su id
    async getProductById(id){
        try {
            const currentProduct = await this.#findProductById(id);
            return currentProduct;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Agrega un nuevo producto
    async addNewProduct(data, file){
        try {
            const { title, description, code, price, status, stock, category } = data;

            if (!title || !description || !code || !price || !status || !stock || !category){
                throw new ErrorHandler("Faltan datos obligatorios", 400);
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
                thumbnails: file? [file.filename] : [],
            };

            this.#products.push(newProduct);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return newProduct;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Actualiza un producto por su Id
    async updateProductById (id, data, file) {
        try {
            const oldProduct = await this.#findProductById(id);
            const { title, description, code, price, status, stock, category } = data;
            const newThumbnails = file? [file.filename] : oldProduct.thumbnails;

            const updatedProduct = {
                id: oldProduct.id,
                title: title || oldProduct.title,
                description: description || oldProduct.description,
                code: code || oldProduct.code,
                price: price ? Number(price) : oldProduct.price,
                status: status ? convertToBoolean(status) : oldProduct.status,
                stock: stock ? Number(stock) : oldProduct.stock,
                category: category || oldProduct.category,
                thumbnails: newThumbnails || oldProduct.thumbnails,
            };

            const index = this.#products.findIndex((product)=> product.id === Number(id));
            this.#products[index] = updatedProduct;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products );

            return updatedProduct;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Borra un producto por su Id, con sus imagenes asociadas en caso de tener.
    async deleteProductById (id) {
        try {
            const currentProduct = await this.#findProductById(id);

            if (currentProduct.thumbnails && currentProduct.thumbnails.length > 0){
                for (const thumbnail of currentProduct.thumbnails){
                    await deleteJsonFile(paths.images, thumbnail);
                }
            }

            const index = this.#products.findIndex((product)=> product.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }
}