const form = document.getElementById("form-contacto")
const campoNombre = document.getElementById("nombre")
const campoEmail = document.getElementById("email")
const campoMensaje = document.getElementById("mensaje")
const botonEnviar = form.querySelector('button[type="submit"]')
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function mostrarError(campo, mensaje) {
  const errorEl = document.getElementById("error-" + campo.id)
  const contenedor = campo.closest(".form-field")
  errorEl.textContent = mensaje
  errorEl.hidden = false
  contenedor.classList.add("form-field--invalid")
  campo.setAttribute("aria-invalid", "true")
}

function limpiarError(campo) {
  const errorEl = document.getElementById("error-" + campo.id)
  const contenedor = campo.closest(".form-field")
  errorEl.textContent = ""
  errorEl.hidden = true
  contenedor.classList.remove("form-field--invalid")
  campo.removeAttribute("aria-invalid")
}

function quitarMensajeExito() {
  const previo = document.getElementById("mensaje-exito")
  if (previo) previo.remove()
}

function mostrarExito() {
  quitarMensajeExito()
  const parrafo = document.createElement("p")
  parrafo.id = "mensaje-exito"
  parrafo.className = "contacto__exito"
  parrafo.setAttribute("role", "status")
  parrafo.textContent =
    "Recibimos tu mensaje. Te vamos a escribir a la brevedad."
  botonEnviar.insertAdjacentElement("afterend", parrafo)
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault()
  quitarMensajeExito()

  const nombre = campoNombre.value.trim()
  const email = campoEmail.value.trim()
  const mensaje = campoMensaje.value.trim()
  let esValido = true

  limpiarError(campoNombre)
  limpiarError(campoEmail)
  limpiarError(campoMensaje)

  if (!nombre) {
    mostrarError(campoNombre, "El nombre no puede estar vacío.")
    esValido = false
  }

  if (!email) {
    mostrarError(campoEmail, "El email no puede estar vacío.")
    esValido = false
  } else if (!emailValido.test(email)) {
    mostrarError(
      campoEmail,
      "Ingresá un email válido, por ejemplo nombre@correo.com.",
    )
    esValido = false
  }

  if (!mensaje) {
    mostrarError(campoMensaje, "El mensaje no puede estar vacío.")
    esValido = false
  }

  if (!esValido) {
    return
  }

  mostrarExito()
  form.reset()
})
