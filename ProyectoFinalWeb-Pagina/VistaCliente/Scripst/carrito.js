document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsContainer = document.querySelector(".carrito-items");
    const totalPriceElement = document.getElementById("total-price");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const updateCarrito = () => {
        carritoItemsContainer.innerHTML = "";
        let total = 0;
        carrito.forEach((item, index) => {
            const itemElement = createCartItemElement(item, index);
            carritoItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = total;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    const createCartItemElement = (item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("carrito-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="carrito-item-img">
            <div class="carrito-item-details">
                <h4>${item.name}</h4>
                <p>S/${item.price}</p>
                <div class="quantity-control">
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">+</button>
                </div>
                <button data-index="${index}" class="remove-button">Eliminar</button>
            </div>
        `;
        return itemElement;
    };

    const removeFromCart = (index) => {
        carrito.splice(index, 1);
        updateCarrito();
    };

    const decreaseQuantity = (index) => {
        if (carrito[index].quantity > 1) {
            carrito[index].quantity--;
            updateCarrito();
        }
    };

    const increaseQuantity = (index) => {
        carrito[index].quantity++;
        updateCarrito();
    };

    const handleCheckoutFormSubmit = (e) => {
        e.preventDefault();
        alert("Pedido confirmado y pagado. Gracias por su compra.");
        localStorage.removeItem("carrito");
        window.location.href = "1_inicio.html";
    };

    const handlePaymentMethodChange = (e) => {
        const paymentDetails = document.getElementById("payment-details");
        paymentDetails.innerHTML = "";
        switch (e.target.value) {
            case "credit-card":
                paymentDetails.innerHTML = `
                    <label for="card-number">Número de Tarjeta:</label>
                    <input type="text" id="card-number" name="card-number" required>
                    <label for="expiry-date">Fecha de Vencimiento:</label>
                    <input type="text" id="expiry-date" name="expiry-date" required>
                    <label for="cardholder-name">Nombre del Titular:</label>
                    <input type="text" id="cardholder-name" name="cardholder-name" required>
                    <label for="cvv">Código de Seguridad (CVV):</label>
                    <input type="text" id="cvv" name="cvv" required>
                `;
                break;
            case "paypal":
                paymentDetails.innerHTML = `
                    <p>Serás redirigido a PayPal para completar tu compra de forma segura.</p>
                `;
                break;
            case "bank-transfer":
                paymentDetails.innerHTML = `
                    <p>Se te proporcionarán los detalles para realizar la transferencia bancaria.</p>
                `;
                break;
            default:
                break;
        }
    };

    carritoItemsContainer.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("remove-button")) {
            removeFromCart(index);
        } else if (e.target.classList.contains("decrease-qty")) {
            decreaseQuantity(index);
        } else if (e.target.classList.contains("increase-qty")) {
            increaseQuantity(index);
        }
    });

    document.getElementById("checkout-form").addEventListener("submit", handleCheckoutFormSubmit);
    document.getElementById("payment-method").addEventListener("change", handlePaymentMethodChange);

    updateCarrito();
});

function addToCart(name, price, image) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existingItem = carrito.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        carrito.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
