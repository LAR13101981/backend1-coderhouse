import ProductModel from "../models/product.model.js";

const productInstance = new ProductModel();

export const httpAddNewProduct = async (req, res) =>{
    try {
        const newProduct = await productInstance.addNewProduct(req.body);

        res.status(201).json({ message: "Product added", payload: newProduct });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpGetAllproducts = async (req, res) => {
    try {
        const products = await productInstance.getAllProducts();

        res.status(200).json({
            message: "This are all the products",
            payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const htppGetProductById = async (req, res) => {
    try {
        const product = await productInstance.getProductById(req.params.pid);

        res.status(200).json({ message: "This is the product you requested", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpUpdateProductById = async (req, res) => {
    try {
        const product = await productInstance.updateProductById(req.params.pid, req.body, req.file);

        res.status(200).json({ message: "Product updated", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

export const httpDeleteProductById = async (req, res)=> {
    try {
        const product = await productInstance.deleteProductById(req.params.pid);

        res.status(200).json({ message: "Product Deleted", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};