const profilePhoto = document.getElementById("profilePicture");
let welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");
const allPostsContainer = document.getElementById("allPostsContainer");
const loginFirst = document.getElementById("loginFirst");

const homeFunction = async () => {

    let usernameToken = localStorage.getItem("token");
    if (!usernameToken) {
        welcomeMessage.innerHTML = `<a href="http://127.0.0.1:3000/frontend/pages/login/login.html">Login</a>`;
        logoutButton.style.display = "none";
        allPostsContainer.style.display="none";
        loginFirst.style.display="block";
    }
    else {
        allPostsContainer.style.display="flex";
        loginFirst.style.display="none";
        console.log(usernameToken);
        const decoded = jwt_decode(usernameToken);
        console.log(decoded.username);
        const userDetailsResponse = await fetch(`http://localhost:5000/api/${decoded.username}/home/userDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const userDetails = await userDetailsResponse.json();
        console.log(userDetails);
        profilePhoto.style.backgroundImage = `url(${userDetails.profileImageUrl})`;
        welcomeMessage.innerText = `Welcome, ${userDetails.name}`;
    }
}

document.getElementById("logoutButton").onclick = async () => {
    localStorage.removeItem("token");
    console.log("redirecting");
    window.location.href = "http://127.0.0.1:3000/frontend/pages/login/login.html";
    console.log("done");

}

homeFunction();

