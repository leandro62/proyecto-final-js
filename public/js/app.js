document.addEventListener("DOMContentLoaded", function() {
    // Variables globales
    const mostrarFormulario = document.getElementById('mostrarFormulario');
    const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
    const headerUsuario = document.querySelector('.header__container-login h6');
    const formularioEmergente = document.getElementById('formularioEmergente');
    const btnCerrarFormulario = document.getElementById('cerrarFormulario');
    const formulario = document.getElementById('formulario');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const enlaceZapatillas = document.getElementById("enlaceZapatillas");
    const enlaceRemeras = document.getElementById("enlaceRemeras");
    const enlaceInicio = document.querySelector("#nav-inicio");
    let carrito = []; 
    let sesionIniciada = nombreUsuarioGuardado !== null; 
    // Cargar productos desde el JSON al iniciar la página
    async function cargarProductos() {
        try {
            const response = await fetch('../json/productos.json');
            if (!response.ok) {
                throw new Error('Error al cargar los productos: ' + response.statusText);
            }
            const productos = await response.json();
            if (!localStorage.getItem('productos')) {
                localStorage.setItem('productos', JSON.stringify(productos));
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar los productos',
                text: 'Hubo un problema al cargar los productos. Inténtalo de nuevo más tarde.',
            });
        }
    }
    // Función para mostrar el nombre de usuario almacenado
    function mostrarNombreUsuario() {
        const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
        if (nombreUsuarioGuardado) {
            headerUsuario.innerHTML = `${nombreUsuarioGuardado}`;
        }
            // Recuperar el carrito del Local Storage al cargar la página
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCantidadCarrito(); // Actualizar la cantidad de productos en el carrito al cargar la página
        }
    }
    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('nombreUsuario'); // Eliminar el nombre de usuario del Local Storage
        headerUsuario.innerHTML = `<h6 class="text-primary text-decoration-none">Usuario</h6>`;
        sesionIniciada = false; // Actualizar el estado de la sesión
        limpiarCarrito(); // Limpia el carrito al cerrar sesión
    }
    // Función para limpiar el carrito
    function limpiarCarrito() {
        carrito = []; // Reinicia el carrito como un array vacío
        actualizarCantidadCarrito(); // Actualiza la cantidad de productos en el carrito
    }
    
    // Función para iniciar sesión
    function iniciarSesion(nombreUsuario) {
        localStorage.setItem('nombreUsuario', nombreUsuario.toUpperCase());
        mostrarNombreUsuario(); // Actualizar nombre en el header
        formularioEmergente.style.display = 'none'; // Oculta el formulario después de iniciar sesión
        sesionIniciada = true; // Actualizar el estado de la sesión
    }
    const btnIniciarSesion2 = document.getElementById('btnIniciarSesion2');
    btnIniciarSesion2.addEventListener('click', function() {
            // Verificar si la sesión está iniciada
        const sesionIniciada = localStorage.getItem('nombreUsuario');
        if (!sesionIniciada) {
            formularioEmergente.style.display = 'block';
        } else {
            // Mostrar un mensaje indicando que la sesión ya está iniciada
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Ya has iniciado sesión",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        }
    });
    mostrarFormulario.addEventListener('click', function() {
        // Verificar si la sesión está iniciada
        const sesionIniciada = localStorage.getItem('nombreUsuario');
        if (!sesionIniciada) {
            formularioEmergente.style.display = 'block';
        } else {
            // Mostrar un mensaje indicando que la sesión ya está iniciada
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Ya has iniciado sesión",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        }
    });
    // Funciones para mostrar y ocultar secciones
    function mostrarZapatillas() {
        sectionZapatillas.style.display = "block";
        sectionRemeras.style.display = "none";
    }
    function mostrarRemeras() {
        sectionZapatillas.style.display = "none";
        sectionRemeras.style.display = "block";
    }
    function mostrarTodo() {
        sectionZapatillas.style.display = "block";
        sectionRemeras.style.display = "block";
    }
    // Evento para cerrar el formulario emergente
    btnCerrarFormulario.addEventListener('click', function() {
        formularioEmergente.style.display = 'none';
    });
     // Botón de iniciar sesión en el formulario emergente
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');
    btnIniciarSesion.addEventListener('click', function() {
        // Validar el formulario antes de iniciar sesión
        if (formulario.checkValidity()) {
            const nombreUsuario = document.getElementById('nombre').value;
            iniciarSesion(nombreUsuario);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Inicio de sesión exitoso",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Por favor, completa todos los campos correctamente",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        }
    });
    // Eventos para las secciones
    enlaceZapatillas.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarZapatillas();
    });
    enlaceRemeras.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarRemeras();
    });
    enlaceInicio.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarTodo();
    });
    // Evento para cerrar sesión
    btnCerrarSesion.addEventListener('click', () =>{
        cerrarSesion();
        Swal.fire({
            position: "center",
            icon: "info",
            title: "Cierre de sesión exitoso",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
        });
        localStorage.removeItem('nombreUsuario');
        headerUsuario.innerHTML = `<h6 class="text-primary text-decoration-none">Usuario</h6>`;
    });
    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(id, nombre, precio) {
         // Verificar si la sesión está iniciada antes de permitir agregar productos al carrito
        if (!sesionIniciada) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Debes iniciar sesión para agregar productos al carrito",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
            return; // Detener la ejecución de la función si la sesión no está iniciada
        }
        const producto = { id, nombre, precio };
        carrito.push(producto); // Agregar el producto al carrito
        actualizarCantidadCarrito(); // Actualizar la cantidad de productos en el carrito
        mostrarMensaje("Producto agregado al carrito");
        // Actualizar el carrito en el Local Storage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    // Función para mostrar mensajes utilizando SweetAlert2
    function mostrarMensaje(mensaje) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: mensaje,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
        });
    }
   // Función para actualizar la cantidad de productos en el carrito
    function actualizarCantidadCarrito() {
        const cantidadCarrito = document.getElementById('cantidadCarrito');
        cantidadCarrito.textContent = carrito.length.toString(); // Actualizar el texto con la cantidad de productos
    }
// Evento para agregar un producto al carrito al hacer clic en "Comprar"
document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const card = button.closest('.card');
        const id = parseInt(card.dataset.id);
        const nombre = card.querySelector('.card-title').textContent.trim();
        const precio = card.querySelector('.text-success').textContent.trim().replace('$', '').replace(',', '');
        agregarProductoAlCarrito(id, nombre, parseFloat(precio));
        actualizarCantidadCarrito(); // Actualizar la cantidad de productos en el carrito
    });
});
    // Evento para mostrar los productos en el carrito al hacer clic en la imagen del carrito
    const headerNavCarrito = document.querySelector('.header__nav-carrito');
    headerNavCarrito.addEventListener('click', function() {
    mostrarProductosEnCarrito();
});

function mostrarProductosEnCarrito() {
    let listaProductos = '';
    let totalCarrito = 0;

    carrito.forEach(producto => {
        listaProductos += `${producto.nombre} - $${producto.precio.toFixed(3)}\n`;
        totalCarrito += producto.precio;
    });
    Swal.fire({
        title: 'Productos en el carrito:',
        html: `${listaProductos}<br><strong>Total: $${totalCarrito.toFixed(3)}</strong>`,
        icon: 'info',
        showCancelButton: true,
        showDenyButton: true,
        denyButtonColor: "#dd6b55",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Comprar",
        cancelButtonText: "Vaciar Carrito",
        denyButtonText: "Seguir Comprando"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Compra exitosa",
                icon: "success"
            }).then(() => {
                vaciarCarritoSilencioso(); // Vacía el carrito después de mostrar el mensaje de compra exitosa
            });
            if (carrito.length === 0) {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "El carrito está vacío",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                });
                return; // Detener la ejecución si el carrito está vacío
            }
        } else if (result.isDenied) {
            Swal.close(); // Cierra el Sweet Alert sin realizar ninguna acción adicional
        } else {
            vaciarCarrito();
        }
    });
    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = []; // Vaciar el array del carrito
        localStorage.removeItem('carrito'); // Eliminar el carrito del Local Storage
        actualizarCantidadCarrito(); // Actualizar la cantidad de productos en el carrito
    Swal.fire({
        position: "center",
        icon: "info",
        title: "Carrito vaciado exitosamente",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
    });
}
// Función para vaciar el carrito de forma silenciosa, sin mostrar ningún mensaje
function vaciarCarritoSilencioso() {
    carrito = []; // Vaciar el array del carrito
    localStorage.removeItem('carrito'); // Eliminar el carrito del Local Storage
    actualizarCantidadCarrito(); // Actualizar la cantidad de productos en el carrito
}
}
           // Mostrar nombre de usuario al cargar la página
    mostrarNombreUsuario();
    cargarProductos();
});