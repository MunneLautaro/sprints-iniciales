async function loadProducts() {
  const response = await fetch(new URL("../data/db.json", import.meta.url))

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los productos (${response.status})`)
  }

  const products = await response.json()

  if (!Array.isArray(products)) {
    throw new Error("El catálogo de productos tiene un formato inválido")
  }

  return products
}

async function getAllProducts() {
  return loadProducts()
}

async function getTopProducts() {
  const products = await loadProducts()
  return products.filter((product) => product.isTop === true)
}

async function getProductById(id) {
  const products = await loadProducts()
  return products.find((product) => product.id === id)
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatPrice(price) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price)
}

function resolveProductImage(imagePath) {
  return new URL(imagePath, import.meta.url).href
}

async function renderSingleProduct() {
  const param = new URLSearchParams(window.location.search)
  const product = await getProductById(param.get("id"))
  const productContainer = document.getElementById("product-container")

  if (!product) {
    productContainer.innerHTML = `
            <section class="producto-detalle">
                <div class="producto-detalle__info">
                    <h1 class="producto-detalle__titulo">Producto no encontrado</h1>
                    <p class="producto-detalle__descripcion">
                        El producto que buscas no existe o ya no está disponible.
                    </p>
                    <a href="products.html" class="btn-carrito">Ver productos</a>
                </div>
            </section>
        `
    return
  }

  const specificationsToArr = Object.entries(product.especificaciones).map(
    (arr) => arr.map((str) => capitalizeFirstLetter(str)),
  )

  productContainer.innerHTML = `
        <section class="producto-detalle">
        <div class="producto-detalle__imagen-contenedor">
            <img 
            src="${resolveProductImage(product.imagen)}"
            alt=${product.nombre} 
            class="producto-detalle__imagen"
            >
        </div>

        <div class="producto-detalle__info">
            <h1 class="producto-detalle__titulo">${capitalizeFirstLetter(product.nombre)}</h1>
            
            <p class="producto-detalle__descripcion">${capitalizeFirstLetter(product.descripcion)}</p>
            
            <p class="producto-detalle__precio">${formatPrice(product.precio)}</p>

            <table class="producto-detalle__especificaciones">
            <tbody>
                ${specificationsToArr
                  .map(
                    (spec) =>
                      `
                            <tr>
                                <th>${spec[0].charAt(0).toUpperCase() + spec[0].slice(1)}</th>
                                <td>${spec[1]}</td>
                            </tr>
                        `,
                  )
                  .join("")}
            </tbody>
            </table>


            <div class="producto-detalle__acciones" id="selector-cantidad">
            
                <div class="selector-cantidad" >
                    <div class="selector-cantidad__controles">
                    <button type="button" class="btn-restar" id="btn-restar" aria-label="Disminuir cantidad">-</button>
                    <input type="number" id="cantidad-producto" value="1" min="1" class="input-cantidad">
                    <button type="button" class="btn-sumar" id="btn-sumar" aria-label="Aumentar cantidad">+</button>
                    </div>
                    <label for="cantidad-producto" class="selector-cantidad__label">Cantidad</label>
                </div>

                <button type="button" class="btn-carrito" id="agregar-carrito">
                    Añadir al carrito
                </button>
            </div>
        </div>
        </section>
    `
  document.dispatchEvent(new Event("productoRenderizado"))
}

function renderProductGrid(products) {
  const grid = document.getElementById("productos-grid")

  if (products.length === 0) {
    grid.innerHTML = `
      <p class="productos__empty" role="status">
        No encontramos productos con esa búsqueda.
      </p>
    `
    return
  }

  grid.innerHTML = products
    .map(
      (producto) => `
        <a href="product.html?id=${producto.id}" class="producto-card">
          <img
            src="${resolveProductImage(producto.imagen)}"
            alt="${producto.alt}"
            class="producto-card__image"
            loading="lazy"
            width="400"
            height="300"
          />
          <div class="producto-card__body">
            <h3 class="producto-card__title">${capitalizeFirstLetter(producto.nombre)}</h3>
            <p class="producto-card__text">${capitalizeFirstLetter(producto.descripcion)}</p>
          </div>
        </a>
        `,
    )
    .join("")
}

async function renderProducts(onlyTop = false) {
  const products = onlyTop ? await getTopProducts() : await getAllProducts()
  renderProductGrid(products)
  return products
}

function setupProductSearch(products) {
  const searchInput = document.getElementById("busqueda-productos")

  if (!searchInput) {
    return
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase()
    const filteredProducts = products.filter((product) => {
      const searchableText =
        `${product.nombre} ${product.descripcion}`.toLocaleLowerCase()
      return searchableText.includes(searchTerm)
    })

    renderProductGrid(filteredProducts)
  })
}

function renderLoadError(container) {
  container.innerHTML = `
        <p role="alert">
            No pudimos cargar el catálogo. Revisá tu conexión e intentá nuevamente.
        </p>
    `
}

async function resolveRoute() {
  try {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html"

    switch (currentPage) {
      case "products.html":
        setupProductSearch(await renderProducts())
        break

      case "index.html":
        await renderProducts(true)
        break

      case "product.html":
        await renderSingleProduct()
        break
    }
  } catch (error) {
    const container =
      document.getElementById("productos-grid") ||
      document.getElementById("product-container")

    if (container) {
      renderLoadError(container)
    }

    console.error("Error al cargar la aplicación:", error)
  }
}

document.addEventListener("DOMContentLoaded", resolveRoute)
