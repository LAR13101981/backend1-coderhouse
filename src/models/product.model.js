import paths from "../utils/paths";
import ErrorHandler from "../utils/error.handler";
import { readJsonFile, writeJsonFile } from "../utils/file.handler";
import { convertToBoolean } from "../utils/converter";

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
            const productFound = this.#products.find((item) => item.id === Number(id));

            if (!productFound){
                throw new ErrorHandler(`No se encontro un producto con el Id:${id}`, 404);
            }

            return productFound;
        } catch (error) {
            throw new error;
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

    // Trae un producto por su id
    async getProductById(id){
        try {
            const productFound = await this.#findProductById(id);
            return productFound;
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

    // Actualiza un producto por su Id
    async updateProductById (id, data, file) {
        try {
            const { title, description, code, price, status, stock, category } = data;
            const oldProduct = await this.#findProductById(id);
            const newThumbnail = file?.filename;

            const updatedProduct = {
                id: oldProduct.id,
                title: title || oldProduct.title,
                description: description || oldProduct.description,
                code: code || oldProduct.code,
                price: price ? Number(price) : oldProduct.price,
                status: status ? convertToBoolean(status) : oldProduct.status,
                stock: stock ? Number(stock) : oldProduct.stock,
                category: category || oldProduct.category,
                thumbnail: newThumbnail || oldProduct.thumbnail,
            };

            const index = this.#products.findindex((product)=> product.id === Number(id));
            this.#products[index] = updatedProduct;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products );

            return updatedProduct;
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }

    // Borra un producto por su ID
    async deleteProductById (id) {
        try {
            const productFound = await this.#findProductById(id);

            if (productFound.thumbnail){
                await deleteJsonFile(paths.images, productFound.thumbnail);
            }

            const index = this.#products.findindex((product)=> product.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
        } catch (error) {
            throw new ErrorHandler(error.message, error.code);
        }
    }
}