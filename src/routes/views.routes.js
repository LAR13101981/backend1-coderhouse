import { Router } from "express";
import { renderHomeView, renderRealTimeProductsView } from "../controllers/views.controller.js";

const viewHomeRouter = Router();
const viewRealTimeRouter = Router();

// Ruta que muesta la home page con la lista de productos
viewHomeRouter.get("/", renderHomeView);
// Ruta que muestra la lista de productos en tiempo real con el formulario de carga de productos
viewRealTimeRouter.get("/", renderRealTimeProductsView);

export { viewHomeRouter, viewRealTimeRouter };