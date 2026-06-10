console.log("Script loaded");


const SUPABASE_URL = "https://zwqoawxftiikglwmmxsz.supabase.co";
const SUPABASE_KEY = "sb_publishable_xgU1hDnKDGz9ucmhedRymQ_qCow0uba";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const signupButton = document.getElementById("signupButton");
const signupPopup = document.getElementById("signupPopup");

const signupForm = document.getElementById("SignupForm");
const signInButton = document.getElementById("signInButton");
const signInPopup = document.getElementById("signInPopup");
const closeSignIn = document.getElementById("closeSignIn");
const logoutButton = document.getElementById("logoutButton");


signupButton.addEventListener("click", () => {
    console.log("Button clicked");
    signupPopup.classList.add("open-popup")
});

signupPopup.classList.remove("open-poup");

function closePopup() {
    signupPopup.classList.remove("open-popup");
}
signInButton.addEventListener("click", () => {
    signInPopup.classList.add("open-popup");
});

closeSignIn.addEventListener("click", () => {
    signInPopup.classList.remove("open-popup");
});


if (signupForm) {
    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                alert(`Erreur d'inscription : ${error.message}`);
                return;
            }

            alert("Inscription réussie ! Un e-mail de confirmation vous a été envoyé si activé.");
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Une erreur inattendue est survenue.");
        }
    });
}

async function updateUI() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const menu = document.getElementById("menu");

    if (session) {
        if (signupButton) signupButton.style.display = "none";
        if (signInButton) signInButton.style.display = "none";
        if (logoutButton) logoutButton.style.display = "inline-block";
        if (menu) menu.style.display = "block";
    } else {
        if (signupButton) signupButton.style.display = "inline-block";
        if (signInButton) signInButton.style.display = "inline-block";
        if (logoutButton) logoutButton.style.display = "none";
        if (menu) menu.style.display = "none";
    }
}

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            alert(`Erreur de déconnexion : ${error.message}`);
        } else {
            alert("Vous êtes déconnecté.");
            window.location.reload();
        }
    });
}

document.getElementById("signInForm")
.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert("Erreur : " + error.message);
        return;
    }

    alert("Connexion réussie !");
    signInPopup.classList.remove("open-popup");

    updateUI();
});


updateUI();
