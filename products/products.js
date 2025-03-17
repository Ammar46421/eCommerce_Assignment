import { db, collection, addDoc, getDocs } from "./../firebase/firebaseConfig.js";

// Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");

    if (!productForm) {
        console.error("Product form not found!");
        return;
    }

    // Handle form submission
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get input elements
        const titleInput = document.getElementById("productTitle");
        const descriptionInput = document.getElementById("description");
        const imageUrlInput = document.getElementById("imageUrl");
        const priceInput = document.getElementById("price");

        // Check if all elements exist before using `.value`
        if (!titleInput || !descriptionInput || !imageUrlInput || !priceInput) {
            console.error("One or more input fields are missing in the DOM.");
            alert("Form elements are missing! Please check your HTML.");
            return;
        }

        // Get values
        const productTitle = titleInput.value;
        const description = descriptionInput.value;
        const imageUrl = imageUrlInput.value;
        const price = priceInput.value;

        console.log("Title:", productTitle);
        console.log("Description:", description);
        console.log("Image URL:", imageUrl);
        console.log("Price:", price);

        // Check if any field is empty
        if (!productTitle || !description || !imageUrl || !price) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            await addDoc(collection(db, "products"), {
                productTitle,
                description,
                imageUrl,
                price,
            });

            alert("Product added successfully!");
            productForm.reset();
            loadProducts(); // Refresh product list
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product!");
        }
    });

    // Load products from Firestore
    async function loadProducts() {
        const productList = document.getElementById("productList");
        if (!productList) {
            console.error("Product list container not found!");
            return;
        }
        
        productList.innerHTML = ""; // Clear existing content

        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            if (querySnapshot.empty) {
                productList.innerHTML = "<p>No products found.</p>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const product = doc.data();

                // Debugging: Log product data
                console.log("Product Data:", product);

                if (!product.imageUrl) {
                    console.error("Missing image URL for product:", product);
                }

                productList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="${product.imageUrl || 'placeholder.jpg'}" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <h5 class="card-title">${product.productTitle}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Price: </strong> $${product.price}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error loading products:", error);
            productList.innerHTML = "<p>Failed to load products.</p>";
        }
    }

    // Load products when the page loads
    loadProducts();
});
