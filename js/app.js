let productos = [];
const carrito = [];

// Función para cargar los productos desde el JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=mini+bag'); 
        const data = await respuesta.json();
        
        // Verifica si 'results' existe antes de usarlo
        if (data.results && Array.isArray(data.results)) {
            productos = data.results; // Guardo los productos en la variable global
            mostrarProductos(); // Llamo a la función para renderizar los productos
        } else {
            console.error('No se encontraron productos o la respuesta no es válida');
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar los productos en el catálogo
function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; // Limpio el contenedor antes de mostrar nuevos productos
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('producto');
        tarjeta.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}">  
            <h3>${producto.title}</h3> 
            <p>Precio: $${producto.price || 100}</p>
            <button onclick="agregarAlCarrito('${producto.id}')">Añadir al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Función para añadir un producto al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
        mostrarMensaje(`¡Añadido al carrito!`); // Mostrar el mensaje
    } else {
        console.error('Producto no encontrado:', productId);
    }
}

// Función para actualizar el carrito (renderizar los productos en el sidebar)
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    const totalContenedor = document.getElementById('total');
    contenedorCarrito.innerHTML = ''; // Limpio el contenido del carrito
    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('item-carrito');

        // Limito el nombre del producto a los primeros 20 caracteres
        const nombreProducto = producto.title.length > 20 ? producto.title.slice(0, 20) + '...' : producto.title;

        item.innerHTML = ` 
            <p>${nombreProducto} - $${producto.price}</p> 
            <button onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
        `;
        contenedorCarrito.appendChild(item);

        // Asegurarse de que el precio sea una cadena y luego procesarlo
        const precioNumerico = parseFloat(String(producto.price).replace('.', '').replace(',', '.'));
        total += precioNumerico;
    });

    totalContenedor.innerHTML = `<p>Total: $${total.toLocaleString('es-AR')}</p>`;
}


// Función para eliminar un producto del carrito
function eliminarDelCarrito(productId) {
    const index = carrito.findIndex(p => p.id === productId);
    if (index !== -1) {
        carrito.splice(index, 1); // Elimino producto del carrito
        actualizarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito.length = 0; // Limpiar el carrito
    actualizarCarrito(); // Actualizar la vista del carrito
    mostrarMensaje('¡Carrito vacío!'); // Mostrar mensaje de notificación
}

// Funcionalidad para abrir y cerrar el carrito
const toggleCartButton = document.getElementById('toggleCart');
const closeCartButton = document.getElementById('closeCart');
const sidebar = document.getElementById('sidebar');

// Abrir el carrito
toggleCartButton.addEventListener('click', () => {
    sidebar.classList.add('open'); // Agregar clase para mostrar el sidebar
    document.body.classList.add('sidebar-open'); // Desplazar el contenido principal
});

// Cerrar el carrito
closeCartButton.addEventListener('click', () => {
    sidebar.classList.remove('open'); // Quitar clase para ocultar el sidebar
    document.body.classList.remove('sidebar-open'); // Restaurar el contenido principal
});

// Función para mostrar el mensaje emergente
function mostrarMensaje(mensaje) {
    // Limitar el mensaje a 30 caracteres 
    const mensajeCorto = mensaje.length > 30 ? mensaje.slice(0, 30) + '...' : mensaje;

    const mensajeDiv = document.getElementById('mensaje');
    const mensajeTexto = document.getElementById('mensaje-texto');
    mensajeTexto.textContent = mensajeCorto; // Mostrar el mensaje recortado
    mensajeDiv.style.display = 'block'; // Mostrar el mensaje

    setTimeout(() => {
        mensajeDiv.style.display = 'none'; // Ocultar el mensaje después de 3 segundos
    }, 3000);
}


// Capturar el selector de ordenamiento
const ordenarPrecios = document.getElementById('ordenarPrecios');

// Función para ordenar y mostrar productos
function ordenarProductos() {
    const criterio = ordenarPrecios.value; // Obtener el valor seleccionado

    if (criterio === 'asc') {
        productos.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Ordenar de menor a mayor
    } else if (criterio === 'desc') {
        productos.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); // Ordenar de mayor a menor
    }

    mostrarProductos(); // Mostrar los productos ordenados
}

// Escuchar el evento 'change' en el selector
ordenarPrecios.addEventListener('change', ordenarProductos);


// Llamar a la función para cargar los productos al iniciar la página
cargarProductos();


// Asignar la función vaciarCarrito al botón de "Finalizar compra"
const finalizarCompraButton = document.getElementById('finalizarCompra');
finalizarCompraButton.addEventListener('click', vaciarCarrito);