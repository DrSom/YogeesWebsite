const firebaseConfig = {
    apiKey: "AIzaSyBgNhDKoa3HO3F93_ZTrOHZhMINlgw6ue0",
    authDomain: "yogees.firebaseapp.com",
    projectId: "yogees",
    storageBucket: "yogees.firebasestorage.app",
    messagingSenderId: "534912924844",
    appId: "1:534912924844:web:f033558206421a8abdb309",
    measurementId: "G-F2Q60YFRD6"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// UI Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const authMessage = document.getElementById('authMessage');
const membersPortal = document.getElementById('members-portal');

// --- 1. Modal Toggle ---
loginBtn.onclick = () => loginModal.classList.remove('hidden');
closeBtn.onclick = () => loginModal.classList.add('hidden');
window.onclick = (event) => {
    if (event.target == loginModal) loginModal.classList.add('hidden');
};

// --- 2. Send Magic Link ---
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const actionCodeSettings = {
        url: window.location.href, // Redirect back here
        handleCodeInApp: true
    };

    try {
        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        authMessage.innerText = "Magic link sent! Check your email.";
        authMessage.classList.remove('hidden');
        emailInput.value = "";
    } catch (error) {
        authMessage.innerText = "Error: " + error.message;
        authMessage.classList.remove('hidden');
    }
};

// --- 3. Complete Sign-in ---
if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        email = window.prompt('Please provide your email for confirmation');
    }
    auth.signInWithEmailLink(email, window.location.href)
        .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            // Clean URL (remove firebase tokens)
            window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((error) => {
            console.error("Sign-in error", error);
        });
}

// --- 4. Auth State Tracking ---
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        membersPortal.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        loginModal.classList.add('hidden');
    } else {
        // User is signed out
        membersPortal.classList.add('hidden');
        logoutBtn.classList.add('hidden');
        loginBtn.classList.remove('hidden');
    }
});

// --- 5. Logout ---
logoutBtn.onclick = () => {
    auth.signOut();
};
