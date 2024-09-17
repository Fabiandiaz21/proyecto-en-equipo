//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    

    // Agregamos funcionalidad al botón de vaciar el carrito
   document.getElementsByClassName('btn-vaciar')[0].addEventListener('click', vaciarCarritoClicked);


   // Agregamos funcionalidad al botón de ocultar/mostrar el carrito
   document.getElementsByClassName('btn-ocultar-carrito')[0].addEventListener('click', toggleCarritoVisibility);



    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos

function pagarClicked() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    
    // Verifica si el carrito está vacío
    if (carritoItems.hasChildNodes()) {
        // Si el carrito no está vacío, procede con la compra
        Swal.fire({
            text: 'La compra fue realizada con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#28a745',
            background: '#d4edda',
            color: '#155724',
            iconColor: '#28a745',
            customClass: {
                popup: 'swal2-border-radius-20',
            },
        });

        // Estilo adicional para bordes redondeados
        const style = document.createElement('style');
        style.innerHTML = `
            .swal2-border-radius-20 {
                border-radius: 20px;
            }
        `;
        document.head.appendChild(style);

        // Elimina todos los elementos del carrito
        while (carritoItems.hasChildNodes()) {
            carritoItems.removeChild(carritoItems.firstChild);
        }
        actualizarTotalCarrito();
        ocultarCarrito();
    } else {
        // Si el carrito está vacío, muestra una alerta
        Swal.fire({
            text: 'El carrito está vacío. Por favor, agrega un producto.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#ffc107', // Color del botón de confirmación
            background: '#fff3cd',         // Color de fondo de la alerta
            color: '#856404',              // Color del texto
            iconColor: '#ffc107',          // Color del ícono
            customClass: {
                popup: 'swal2-border-radius-20',
            },
        });

        // Estilo adicional para bordes redondeados
        const style = document.createElement('style');
        style.innerHTML = `
            .swal2-border-radius-20 {
                border-radius: 20px;
            }
        `;
        document.head.appendChild(style);
    }
}

//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            Swal.fire({
                text: 'El producto ya está en el carrito.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#d33', // Color del botón de confirmación
                background: '#f8d7da',      // Color de fondo de la alerta
                color: '#721c24',           // Color del texto
                iconColor: '#d33',          // Color del ícono
                customClass: {
                  popup: 'swal2-border-radius-20', // Clase personalizada para los bordes redondeados
                },
              });
              
              // Estilo adicional para bordes redondeados
              const style = document.createElement('style');
              style.innerHTML = `
                .swal2-border-radius-20 {
                  border-radius: 20px;
                }
              `;
              document.head.appendChild(style);
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"  style="border: 1px solid white; padding: 4px; border-radius: 50%;"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled style="color:white">
                    <i class="fa-solid fa-plus sumar-cantidad"  style="border: 1px solid white; padding: 4px; border-radius: 50%;"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}



// Función que vacía el carrito
function vaciarCarritoClicked(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

//funcion de mostrar el carro
function toggleCarritoVisibility(){
    var carrito = document.getElementsByClassName('carrito')[0];
    var items = document.getElementsByClassName('contenedor-items')[0];
    var boton = document.getElementsByClassName('btn-ocultar-carrito')[0];

    if(carritoVisible){
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        items.style.width = '100%';
        boton.innerHTML = '<i class="fas fa-shopping-cart"></i>'; 
        carritoVisible = false;
    } else {
        carrito.style.marginRight = '0';
        carrito.style.opacity = '1';
        items.style.width = '60%';
        boton.innerHTML = '<i class="fas fa-shopping-cart"></i>'; 
        carritoVisible = true;
    }
}



        //animacion de la primera portada

        let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next')
}


// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev')
}


function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }


    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) 
} 

function enviarWhatsapp() {
    const telefono = '+57 3208394063';
    const msj = '¡Hola!, quiero más información sobre Perfumes';
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${msj}`;

    window.open(url, '_blank');
}

// Define la función oneclick
function oneclick(videoUrl) {
    window.open(videoUrl, '_blank');
}

// Agrega el evento de clic al ícono de YouTube
document.addEventListener('DOMContentLoaded', function() {
    const youtubeIcon = document.getElementById('youtube-icon');
    if (youtubeIcon) {
        youtubeIcon.addEventListener('click', function(event) {
            event.preventDefault(); // Previene la acción por defecto del enlace
            oneclick('https://www.youtube.com/watch?v=VWRqJQZTYqw'); // URL del video
        });
    }
});






