const cartNumber = document.getElementById("cart-number")
function handleCartChange(){
    cartNumber.innerText = localStorage.getItem("cart") ?? ""
}

document.addEventListener("DOMContentLoaded",handleCartChange)


if(window.location.pathname == "/muebleria-jota/product.html"){
    document.addEventListener("productoRenderizado",()=>{
        const selectorCantidad = document.getElementById("selector-cantidad")
        const cantidadProducto = document.getElementById("cantidad-producto")

        function handleClick(event){ 
            switch (event.target.id) {
                case "btn-sumar":
                    cantidadProducto.value = parseInt(cantidadProducto.value) + 1;
                    break;
            
                case "btn-restar":
                    cantidadProducto.value = parseInt(cantidadProducto.value) - 1;
                    break;

                case "agregar-carrito":
                    if(cartNumber.innerText !== ""){
                        cartNumber.innerText = parseInt(cartNumber.innerText) + parseInt(cantidadProducto.value)
                    }else{
                        cartNumber.innerText = cantidadProducto.value
                    }
                    localStorage.setItem("cart",cartNumber.innerText)
            }
        }

        function handleKeys(event) {   
            const teclasControl = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (teclasControl.includes(event.key)) {
                return; 
            }

            const esNumero = /^[0-9]$/.test(event.key);
            if (!esNumero) {
                event.preventDefault();
            }
        }

        cantidadProducto.addEventListener("keydown",handleKeys)
        selectorCantidad.addEventListener("click",handleClick)
    })   
}