const productosDestacados = [
  {
    nombre: "Sofá Patagonia",
    descripcion:
      "Amplio y cómodo, pensado para compartir momentos en familia. Tapizado en tela de primera calidad con estructura robusta.",
    imagen: "assets/sofaPatagonia.png",
    alt: "Sofá Patagonia tapizado en tonos tierra",
  },
  {
    nombre: "Silla de Trabajo Belgrano",
    descripcion:
      "Ergonómica y elegante, ideal para tu espacio de estudio u oficina en casa. Madera maciza y acabado cuidado.",
    imagen: "assets/sillaDeTrabajoBelgrano.png",
    alt: "Silla de trabajo Belgrano en madera",
  },
  {
    nombre: "Aparador Uspallata",
    descripcion:
      "Pieza versátil para living o comedor. Líneas limpias y amplio espacio de guardado para organizar con estilo.",
    imagen: "assets/aparadorUspallata.png",
    alt: "Aparador Uspallata de madera con estantes",
  },
  {
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "El punto de encuentro de tu living. Diseño atemporal en madera noble, perfecta para acompañar cada conversación.",
    imagen: "assets/mesaDeCentroAraucaria.png",
    alt: "Mesa de centro Araucaria en madera",
  },
];

function renderProductosDestacados() {
  const grid = document.getElementById("productos-grid");
  if (!grid) return;

  grid.innerHTML = productosDestacados
    .map(
      (producto) => `
    <article class="producto-card">
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
    </article>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderProductosDestacados);
