import express from "express";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/api/public", express.static("./src/public"));

app.use("/api/products");
app.use("/api/carts");

app.listen(PORT, () => {
    console.log(`Server levantado en http://localhost:${PORT}`);
});