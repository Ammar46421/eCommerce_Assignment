document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.getElementById("cartItems");
    const totalAmountDisplay = document.getElementById("totalAmount");

    function renderCart() {
        cartTable.innerHTML = "";
        let totalAmount = 0;

        cartItems.forEach((item, index) => {
            totalAmount += item.totalPrice;

            cartTable.innerHTML += `
                <tr>
                    <td><img src="${item.image}" width="50" alt="${item.title}"></td>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                    <td>$${item.totalPrice}</td>
                </tr>
            `;
        });

        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    renderCart();
});
