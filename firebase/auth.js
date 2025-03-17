import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from './firebaseConfig.js';

// Signup Function
document.getElementById("signUpBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.querySelector("#signup-form #email").value;
    const password = document.querySelector("#signup-form #password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully! Please sign in.");
        toggleForm(); // Switch to sign-in form
    } catch (error) {
        alert(error.message);
    }
});

// Signin Function
document.getElementById("signInBtn").addEventListener("click", async () => {
    const email = document.querySelector("#signin-form #email").value;
    const password = document.querySelector("#signin-form #password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Signed in successfully!");
        window.location.href = "../products/products.html";
 // Redirect to products page
    } catch (error) {
        alert(error.message);
    }
});

// Auth State Change Listener
onAuthStateChanged(auth, (user) => {
    if (!user && !window.location.pathname.includes('accounts.html')) {
        window.location.href = 'accounts.html';
    }
});
