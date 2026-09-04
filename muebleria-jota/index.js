async function getAllProducts() {
    let result = await fetch("./assets/db.json").then(response => response.json())
    return result
}

async function getTopProducts(){
    const result = await fetch("./assets/db.json").then(response => response.json())
    return result.filter(product => product.isTop == true)
}

async function getProductById(id){
    let product;
    const result = await fetch("./assets/db.json").then(response => response.json()).then((arr =>{
        arr.forEach(element => {
            if(element.id == id){
                product = element;
            }
        });
    }))

    return product;
}

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

async function renderSingleProduct(){
    const param = new URLSearchParams(window.location.search)
    const product = await getProductById(param.get("id"));
    const productContainer = document.getElementById("product-container")
    const specificationsToArr = Object.entries(product.especificaciones).map(arr => arr.map(str => capitalizeFirstLetter(str)))
    
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
            <h1 class="producto-detalle__titulo">${capitalizeFirstLetter(product.nombre)}</h1>
            
            <p class="producto-detalle__descripcion">${capitalizeFirstLetter(product.descripcion)}</p>
            
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

async function renderProducts(onlyTop = false){
    const grid = document.getElementById("productos-grid");
    const products = onlyTop? await getTopProducts() : await getAllProducts()

    grid.innerHTML = products.map(
      (producto) => `
        <a href="product.html?id=${producto.id}" class="producto-card">
          <img
            src="${producto.imagen}"
            alt="${producto.alt}"
            class="producto-card__image"
            loading="lazy"
            width="400"
            height="300"
          />
          <div class="producto-card__body">
            <h3 class="producto-card__title">${producto.nombre}</h3>
            <p class="producto-card__text">${producto.descripcion}</p>
          </div>
        </a>
        `
    )
    .join("");
}

async function resolveRoute(){
    switch (window.location.pathname) {
        case "/muebleria-jota/products.html":
            await renderProducts()
            break;

        case "/muebleria-jota/index.html":
            await renderProducts(true)
            break;
        
        case "/muebleria-jota/product.html":
            await renderSingleProduct()
            break;
    }
}

document.addEventListener("DOMContentLoaded", resolveRoute)