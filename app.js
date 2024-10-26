// Variables
let nombreUsuario;
let totalCompra = 0;
let descuento = 0;

// Array de productos (nombre y precio)
let productos = [
    { nombre: "Anillo", precio: 1000 },
    { nombre: "Collar", precio: 2000 },
    { nombre: "Pulsera", precio: 1500 }
];

// Función para capturar nombre de usuario
function capturarNombre() {
    nombreUsuario = prompt("Por favor, ingresa tu nombre:");
}

// Función para seleccionar productos
function seleccionarProductos() {
    let eleccion = prompt("Elige un producto: 1. Anillo, 2. Collar, 3. Pulsera");
    let productoSeleccionado = productos[parseInt(eleccion) - 1];

    if (productoSeleccionado) {
        totalCompra += productoSeleccionado.precio;
        alert(`Has agregado ${productoSeleccionado.nombre} a tu compra. Total hasta ahora: $${totalCompra}`);
    } else {
        alert("Producto no válido.");
    }
}

// Función para aplicar descuento
function aplicarDescuento() {
    let tieneDescuento = prompt("¿Tienes un código de descuento? (si/no)");
    
    if (tieneDescuento.toLowerCase() === "si") {
        descuento = parseInt(prompt("Ingresa el porcentaje de descuento (solo el número):"));
        totalCompra -= (totalCompra * descuento / 100);
        alert(`Se ha aplicado un descuento del ${descuento}%. Total final: $${totalCompra}`);
    } else {
        alert("No se aplicó ningún descuento.");
    }
}

// Función principal para ejecutar el simulador
function ejecutarSimulador() {
    capturarNombre();
    
    let continuarComprando = true;
    
    while (continuarComprando) {
        seleccionarProductos();
        continuarComprando = prompt("¿Deseas agregar otro producto? (si/no)").toLowerCase() === "si";
    }
    
    aplicarDescuento();
    
    alert(`${nombreUsuario}, el total de tu compra es: $${totalCompra}`);
}

// Asignar la función al botón
document.getElementById("iniciarSimulador").onclick = ejecutarSimulador;
