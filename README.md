# E-commerce Mueblería Hermanos Jota

## Participantes:

- Fabricio Ibarra
- Munné Lautaro
- Giovinazzo Sofia Belén
- Ariadna Luz Chiapin
- Guido Sut

## Descripción

Sitio web de e-commerce para la mueblería Hermanos Jota. Permite explorar el catálogo de muebles, consultar el detalle de cada producto, buscar por nombre o descripción y seleccionar cantidades para agregarlas al carrito.

El catálogo se carga desde un archivo JSON local y la cantidad del carrito se persiste en el navegador mediante `localStorage`.

## Instalación Clonar el repositorio: 
```bash
git clone https://github.com/MunneLautaro/sprints-iniciales.git
```

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES Modules)
- JSON para los datos del catálogo
- Fetch API para cargar los productos
- `localStorage` para persistir la cantidad del carrito
- Google Fonts: Inter y Playfair Display

## Ejecución

Como la aplicación carga datos mediante `fetch`, debe ejecutarse usando un servidor local.

La aplicación está organizada por responsabilidades dentro de `muebleria-jota`:

```text
muebleria-jota/
├── pages/      # Páginas HTML
├── styles/     # Hojas de estilos
├── scripts/    # Lógica JavaScript
├── data/       # Catálogo en JSON
└── assets/     # Imágenes y logo
```

Desde la carpeta que contiene el proyecto:

```powershell
py -m http.server 5500
```

Luego abrir en el navegador:

```text
http://localhost:5500/muebleria-jota/pages/index.html
```
