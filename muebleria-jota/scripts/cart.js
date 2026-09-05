const cartNumber = document.getElementById("cart-number")
function handleCartChange() {
  cartNumber.innerText = localStorage.getItem("cart") ?? ""
}

function showCartNotification(quantity) {
  let notification = document.getElementById("cart-notification")

  if (!notification) {
    notification = document.createElement("p")
    notification.id = "cart-notification"
    notification.className = "cart-notification"
    notification.setAttribute("role", "status")
    notification.setAttribute("aria-live", "polite")
    document.body.append(notification)
  }

  notification.textContent = `${quantity} ${quantity === 1 ? "producto agregado" : "productos agregados"} al carrito.`
  notification.classList.add("cart-notification--visible")

  window.setTimeout(() => {
    notification.classList.remove("cart-notification--visible")
  }, 2500)
}

document.addEventListener("DOMContentLoaded", handleCartChange)

if (window.location.pathname.split("/").pop() === "product.html") {
  document.addEventListener("productoRenderizado", () => {
    const selectorCantidad = document.getElementById("selector-cantidad")
    const cantidadProducto = document.getElementById("cantidad-producto")

    function getValidQuantity() {
      const quantity = Number.parseInt(cantidadProducto.value, 10)
      const validQuantity =
        Number.isInteger(quantity) && quantity >= 1 ? quantity : 1

      cantidadProducto.value = validQuantity
      return validQuantity
    }

    function handleClick(event) {
      switch (event.target.id) {
        case "btn-sumar":
          cantidadProducto.value = getValidQuantity() + 1
          break

        case "btn-restar":
          cantidadProducto.value = Math.max(getValidQuantity() - 1, 1)
          break

        case "agregar-carrito":
          const quantity = getValidQuantity()
          const currentCart = Number.parseInt(cartNumber.innerText, 10) || 0

          cartNumber.innerText = currentCart + quantity
          localStorage.setItem("cart", cartNumber.innerText)
          showCartNotification(quantity)
      }
    }

    cantidadProducto.addEventListener("change", getValidQuantity)

    function handleKeys(event) {
      const teclasControl = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ]
      if (teclasControl.includes(event.key)) {
        return
      }

      const esNumero = /^[0-9]$/.test(event.key)
      if (!esNumero) {
        event.preventDefault()
      }
    }

    cantidadProducto.addEventListener("keydown", handleKeys)
    selectorCantidad.addEventListener("click", handleClick)
  })
}
