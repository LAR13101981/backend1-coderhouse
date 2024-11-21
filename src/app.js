import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import { viewHomeRouter, viewRealTimeRouter } from "./routes/views.routes.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";

const app = express();

const PORT = 8080;

app.use(express.json());
configHandlebars(app);

app.use("/api/public", express.static("./src/public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewHomeRouter);
app.use("/realTimeProducts", viewRealTimeRouter);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);