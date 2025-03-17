import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    db, 
    collection, 
    addDoc, 
    getDocs 
} from './firebaseConfig.js';

// 🚀 Sign-Up Function
document.getElementById("signUpBtn").addEventListener("click", async () => {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore with only required fields
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            email: email,
            role: "user" // Default role
        });

        alert("Account created successfully! Please sign in.");
        toggleForm(); // Switch to sign-in form
    } catch (error) {
        alert(error.message);
    }
});

// 🚀 Sign-In Function
document.getElementById("signInBtn").addEventListener("click", async () => {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const querySnapshot = await getDocs(collection(db, "users"));
        let userData = null;

        querySnapshot.forEach((doc) => {
            if (doc.data().uid === user.uid) {
                userData = doc.data();
            }
        });

        if (userData) {
            alert(`Welcome back, ${userData.name}!`);
            window.location.href = "./../products/products.html"; // Redirect to Products Page
        } else {
            alert("No user data found. Please contact support.");
        }
    } catch (error) {
        alert(error.message);
    }
});
