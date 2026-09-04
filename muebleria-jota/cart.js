if(window.location.pathname == "/muebleria-jota/product.html"){

    document.addEventListener("productoRenderizado",()=>{
        const selectorCantidad = document.getElementById("selector-cantidad")
        const cantidadProducto = document.getElementById("cantidad-producto")
        
        function handleClick(event){
            if(event.target.id == "btn-sumar"){
                cantidadProducto.value = parseInt(cantidadProducto.value) + 1;
            }else if(event.target.id == "btn-restar"){
                cantidadProducto.value = parseInt(cantidadProducto.value) - 1;
            }
        }

        selectorCantidad.addEventListener("click",handleClick)
    })
    
}