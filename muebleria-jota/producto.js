const param = new URLSearchParams(window.location.search)

const productContainer = document.getElementById("product-container")

async function searchProduct(id){
    let product;
    const result = await fetch("db.json").then(response => response.json()).then((arr =>{
        console.log(arr);
        arr.forEach(element => {
            if(element.id == id){
                product = element;
            }
        });
    }))

    return product;
}

async function renderProduct(event){
    const product = await searchProduct(param.get("id"));
    console.log(param.get("id"))
    const specificationsToArr = Object.entries(product.especificaciones)
    
    productContainer.innerHTML = `
        <section class="producto-detalle">
        <!-- Columna izquierda: Imagen -->
        <div class="producto-detalle__imagen-contenedor">
            <img 
            src="${product.imagen}"
            alt=${product.nombre} 
            class="producto-detalle__imagen"
            >
        </div>

        <!-- Columna derecha: Información -->
        <div class="producto-detalle__info">
            <h1 class="producto-detalle__titulo">${product.nombre}</h1>
            
            <p class="producto-detalle__descripcion">${product.descripcion}</p>
            
            <p class="producto-detalle__precio">$1200000</p>

            <!-- Especificaciones -->
            <table class="producto-detalle__especificaciones">
            <tbody>
                ${
                    specificationsToArr.map(spec =>
                        `
                            <tr>
                                <th>${spec[0].charAt(0).toUpperCase() + spec[0].slice(1)}</th>
                                <td>${spec[1]}</td>
                            </tr>
                        `
                    ).join("")
                }
            </tbody>
            </table>

            <!-- Acciones de compra -->
            <div class="producto-detalle__acciones">
            
            <!-- Selector de cantidad -->
            <div class="selector-cantidad">
                <div class="selector-cantidad__controles">
                <button type="button" class="btn-restar" aria-label="Disminuir cantidad">-</button>
                <input type="number" id="cantidad-producto" value="1" min="1" class="input-cantidad">
                <button type="button" class="btn-sumar" aria-label="Aumentar cantidad">+</button>
                </div>
                <label for="cantidad-producto" class="selector-cantidad__label">Cantidad</label>
            </div>

            <!-- Botón de carrito -->
            <button type="button" class="btn-carrito">
                Añadir al carrito
            </button>

            </div>
        </div>
        </section>
    `
}

document.addEventListener("DOMContentLoaded",renderProduct)