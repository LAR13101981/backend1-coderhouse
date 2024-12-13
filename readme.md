Entrega Final CoderHouse Backend 1

Descripcion: Es una simple api orientada a un e-commerce con dos caracteristicas principales que manejan productos y carritos de compra. Contiene operaciones crud elementales y validaciones basicas, un motor de plantillas para renderizar una pagina de inicio basica con la lista de las productos, y otra con la ruta especifica que trabaja con websocket para renderizar la misma lista de productos pero en tiempo real con los cambios realizados.

Caracteristicas:

Productos: Crear, leer, modificar, borrar y mostar los productos.
Carritos: Crear, borrar, mostrar y agregar productos a los carritos.
Validacion: Validacion basica para asegurar el ingreso correcto de datos y parametros.
Manejo de errores: Mensajes de error para peticiones incorrectas.
Renderizado de pagina inicial, carrito, detalles del producto y productos en tiempo real.

Tecnologias usadas:

JavaScript.js
Node.js
Express.js
dotenv
paginate-v2
handlebars
socket.io

Uso

Se puede interactuar con la lista de productos, agregando al carrito elementos, borrandolos o vaciando el carrito.
Se pueden utilizar herramients como Postman para interactuar con los endpoints de la api.
Se puede ingresar y borrar productos mediante el formulario en la ruta especifica /realTimeProducts.