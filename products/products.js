import { db, collection, getDocs, doc, deleteDoc } from "./../firebase/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("productList");

    async function loadProducts() {
        productList.innerHTML = ""; // Clear existing content

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
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                                <a href="form.html?id=${productId}" class="btn btn-warning btn-sm">Edit</a>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${productId}">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Attach delete functionality
            document.querySelectorAll(".delete-btn").forEach((button) => {
                button.addEventListener("click", async (event) => {
                    const productId = event.target.dataset.id;
                    if (confirm("Are you sure you want to delete this product?")) {
                        try {
                            await deleteDoc(doc(db, "products", productId));
                            alert("Product deleted successfully!");
                            loadProducts();
                        } catch (error) {
                            console.error("Error deleting product:", error);
                            alert("Failed to delete product!");
                        }
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
