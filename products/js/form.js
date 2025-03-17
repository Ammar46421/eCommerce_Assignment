import { db, collection, addDoc, doc, updateDoc, getDoc } from "./../../firebase/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productForm = document.getElementById("productForm");
    const productIdField = document.getElementById("productId");
    const titleInput = document.getElementById("productTitle");
    const descriptionInput = document.getElementById("description");
    const imageUrlInput = document.getElementById("imageUrl");
    const priceInput = document.getElementById("price");

    // Check if editing (Get ID from URL)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        productIdField.value = productId;

        // Fetch product details and pre-fill the form
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            const product = productSnap.data();
            titleInput.value = product.productTitle;
            descriptionInput.value = product.description;
            imageUrlInput.value = product.imageUrl;
            priceInput.value = product.price;
        } else {
            alert("Product not found!");
        }
    }

    // Handle form submission (Add or Update)
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const productTitle = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const imageUrl = imageUrlInput.value.trim();
        const price = priceInput.value.trim();

        if (!productTitle || !description || !imageUrl || !price) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            if (productId) {
                // Update existing product
                const productRef = doc(db, "products", productId);
                await updateDoc(productRef, { productTitle, description, imageUrl, price });
                alert("Product updated successfully!");
            } else {
                // Add new product
                await addDoc(collection(db, "products"), { productTitle, description, imageUrl, price });
                alert("Product added successfully!");
            }

            // Redirect back to product list
            // window.location.href = "products.html";
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product!");
        }
    });
});
