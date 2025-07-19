document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loadingBarContainer = document.getElementById("loadingBarContainer");
    const loadingBar = document.getElementById("loadingBar");
    const loadingStatus = document.getElementById("loadingStatus");
    const loadingCircle = document.getElementById("loadingCircle");
    const checkStatus = document.getElementById("checkStatus");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    loadingCircle.style.display = "block";
    loadingBar.style.backgroundColor = "#c3fe95ff";
    loadingStatus.innerText = "Fetching";
    loadingBarContainer.style.display = "flex";

    const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    loadingStatus.innerText = "Loading";
    loadingBarContainer.style.display = "flex";
    await delay(1000);
    loadingStatus.innerText = "Checking Data";
    await delay(1000);

    const data = await response.json();
    if (data.message != "User logged in successfully.") {
        loadingCircle.style.display = "none";
        loadingBar.style.backgroundColor = "#fe9795ff";
        loadingStatus.innerText = data.message;
    }
    if (data.message === "User logged in successfully.") {
        loadingCircle.style.display = "none";
        checkStatus.style.display = "block";
        loadingBar.style.backgroundColor = "#c3fe95ff";
        loadingStatus.innerText = "User logged in successfully";
        await delay(1000);
        window.location.href = "http://127.0.0.1:3000/frontend/pages/home/home.html";
    }
});

