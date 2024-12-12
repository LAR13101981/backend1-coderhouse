export const renderHomeView = async (req, res) => {
    try {
        res.render("home", { title: "Pagina de inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export const renderRealTimeProductsView = async (req, res) => {
    try {
        res.render("realTimeProducts", { title: "Real time products list" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export const renderCartView = async (req, res) => {
    try {
        res.render("cart", { title: "Carrito de compras" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export const renderProductDetails = async (req, res) => {
    try {
        res.render("productDetail", { title: "Carrito de compras" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};