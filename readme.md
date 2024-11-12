Pre entrega 1 CoderHouse Backend 1

Descripcion: Es una simple api orientada a un e-commerce con dos caracteristicas principales que manejan productos y carritos de compra. Contiene operaciones crud elementales y validaciones basicas.

Caracteristicas:

Productos: Crear, leer, modificar, borrar y mostar los productos.
Carritos: Crear, borrar, mostrar y agregar productos a los carritos.
Validacion: Validacion basica para asegurar el ingreso correcto de datos y parametros.
Manejo de errores: Mensajes de error para peticiones incorrectas.

Tecnologias usadas:

JavaScript.js
Node.js
Express.js
File System (fs) para la persistencia de los datos.

Uso

Se puede utilizar herramients como Postman para interactuar con los endpoints de la api.

API endpoints

PRODUCTOS

- Crear un producto nuevo

    POST /api/products
    Body:
    {
        "title": "Total full CG x 15 ml",
        "description" : "Antiparasitario interno en suspension para perros y gatos.",
        "code": "00101",
        "price": 4200,
        "status": "true",
        "stock": 30,
        "category": "Holliday"
    }

- Crear un producto nuevo con imagen
    
    POST /api/products
    Body: form-data
    
    Pasar los parametros como key - value
    y agregar un key file con tipo file y cargar la imagen.

- Traer todos los productos

    GET /api/products    

- Traer un producto especifico por su ID

    GET /api/products/(productID)

- Modificar un producto por su ID

    PUT /api/products/(productID)
    Body:
    {
    "title": "Total full CG x 25 ml",    
    "stock": 50    
    }

- Borrar un producto por us ID

    DELETE /api/products/(productID)

CARRITOS

- Crear un nuevo carrito

    POST /api/carts

- Traer todos los carritos 

    GET /api/carts

- Traer un carrito especifico por su ID con sus productos

    GET  /api/carts/(cartID)

- Sumar un producto nuevo a un carrito, o aumentar la cantidad de un producto ya existente dentro del carrito

    POST /api/carts/(cartID)/product/(productID)

- Borrar un carrito con todo su contenido por su ID

    DELETE /api/carts/(cartID)


Futuras mejoras

- Incorporar la posibilidad de adjuntar una o mas imagenes a cada producto.