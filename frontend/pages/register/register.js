document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const fileInput = document.getElementById("file-input").files[0];

    if (!fileInput) {
        alert("Please upload a profile image.");
        return;
    }

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const profileImageUrl = await getBase64(fileInput);

    const payload = {
        name,
        username,
        password,
        profileImageUrl
    };

    const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    alert(data.message);
    if (data.message === "User registered successfully.") {
        window.location.href = "http://127.0.0.1:3000/frontend/pages/login/login.html";
    }
});

