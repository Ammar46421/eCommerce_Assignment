import { auth, onAuthStateChanged, signOut } from "./../firebase/firebaseConfig.js";

// Elements
const loggedUserFName = document.getElementById("loggedUserFName");
const loggedUserEmail = document.getElementById("loggedUserEmail");
const logoutBtn = document.getElementById("logout");

// Listen for Auth State Changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Display Name and Email
        loggedUserFName.textContent = user.displayName || "User";
        loggedUserEmail.textContent = user.email;
    } else {
        // Redirect to login page if not authenticated
        window.location.href = "accounts.html";
    }
});

// Logout Function
logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        window.location.href = "./../accounts/accounts.html"; // Redirect to login
    } catch (error) {
        alert(error.message);
    }
});
