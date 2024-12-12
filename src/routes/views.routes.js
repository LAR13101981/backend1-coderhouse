import { Router } from "express";
import { renderHomeView, renderRealTimeProductsView, renderCartView } from "../controllers/views.controller.js";

const viewHomeRouter = Router();
const viewRealTimeRouter = Router();
const viewCartRouter = Router();

viewHomeRouter.get("/", renderHomeView);

viewRealTimeRouter.get("/", renderRealTimeProductsView);

viewCartRouter.get("/", renderCartView);

export { viewHomeRouter, viewRealTimeRouter, viewCartRouter };