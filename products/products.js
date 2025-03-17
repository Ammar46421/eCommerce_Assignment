import { db, collection, getDocs } from "./../firebase/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("productList");

    async function loadProducts() {
        productList.innerHTML = ""; // Clear existing content
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            if (querySnapshot.empty) {
                productList.innerHTML = "<p>No products found.</p>";
                return;
            }

            querySnapshot.forEach((docSnap) => {
                const product = docSnap.data();
                const productId = docSnap.id;

                productList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="${product.imageUrl}" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <h5 class="card-title">${product.productTitle}</h5>
                                <!-- <p class="card-text">${product.description}</p> -->
                                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                                <button class="btn btn-primary btn-sm add-to-cart" data-id="${productId}" data-title="${product.productTitle}" data-price="${product.price}" data-image="${product.imageUrl}">Add to Cart</button>
                                <button class="btn btn-secondary btn-sm add-to-favorites" data-id="${productId}" data-title="${product.productTitle}" data-image="${product.imageUrl}">Add to Favorites</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Attach event listeners for "Add to Cart"
            document.querySelectorAll(".add-to-cart").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const id = event.target.dataset.id;
                    const title = event.target.dataset.title;
                    const price = parseFloat(event.target.dataset.price);
                    const image = event.target.dataset.image;

                    let existingProduct = cart.find((item) => item.id === id);

                    if (existingProduct) {
                        existingProduct.quantity += 1;
                        existingProduct.totalPrice = existingProduct.quantity * price;
                    } else {
                        cart.push({
                            id,
                            title,
                            price,
                            quantity: 1,
                            totalPrice: price,
                            image
                        });
                    }

                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(`${title} added to cart!`);
                });
            });

            // Attach event listeners for "Add to Favorites"
            document.querySelectorAll(".add-to-favorites").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                    const id = event.target.dataset.id;
                    const title = event.target.dataset.title;
                    const image = event.target.dataset.image;

                    if (!favorites.some((fav) => fav.id === id)) {
                        favorites.push({ id, title, image });
                        localStorage.setItem("favorites", JSON.stringify(favorites));
                        alert(`${title} added to favorites!`);
                    } else {
                        alert(`${title} is already in favorites!`);
                    }
                });
            });

        } catch (error) {
            console.error("Error loading products:", error);
            productList.innerHTML = "<p>Failed to load products.</p>";
        }
    }

    // Load products when the page loads
    loadProducts();
});

let cartCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.getElementById("cartCount");

    function updateCartCount() {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? "inline-block" : "none";
    }

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            updateCartCount();
        });
    });

    updateCartCount();
});
