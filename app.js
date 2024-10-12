// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Función para iniciar el simulador
function iniciarSimulador() {
    alert("¡Bienvenido al Simulador de Costos Totales!");

    let numeroProductos = parseInt(prompt("¿Cuántos productos deseas calcular?"));

    if (isNaN(numeroProductos) || numeroProductos <= 0) {
        alert("Por favor, ingresa un número válido de productos.");
        return;
    }

    let total = calcularTotal(numeroProductos);
    mostrarResultado(total);
}

// Función para calcular el total usando un ciclo y clases
function calcularTotal(cantidad) {
    let suma = 0;
    let productos = [];

    for (let i = 1; i <= cantidad; i++) {
        let nombre = prompt(`Ingresa el nombre del producto ${i}:`);
        let precio = parseFloat(prompt(`Ingresa el precio del producto ${i}:`));

        if (isNaN(precio) || precio < 0) {
            alert("Precio inválido. Por favor, ingresa un número positivo.");
            i--;
            continue;
        }

        let producto = new Producto(nombre, precio);
        productos.push(producto);
        suma += producto.precio;
    }

    console.log(productos); // Para ver los productos en la consola
    return suma;
}

// Función para mostrar el resultado
function mostrarResultado(total) {
    alert(`El costo total de los productos es: $${total.toFixed(2)}`);
}
