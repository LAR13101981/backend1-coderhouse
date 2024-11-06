import express from "express";
import productRouter from "./routes/product.routes";
import cartRouter from "./routes/cart.routes";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/api/public", express.static("./src/public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Server levantado en http://localhost:${PORT}`);
});