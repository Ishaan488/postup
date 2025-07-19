document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    alert("responding");
    const data = await response.json();
    alert(data.message);
    if (data.message === "User logged in successfully.") {
        window.location.href = "http://127.0.0.1:3000/frontend/pages/home/home.html";
    }
});

