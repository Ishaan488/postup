document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const fileInput = document.getElementById("file-input").files[0];
    const loadingBarContainer=document.getElementById("loadingBarContainer");
    const loadingBar=document.getElementById("loadingBar");
    const loadingStatus=document.getElementById("loadingStatus");
    const loadingCircle=document.getElementById("loadingCircle");
    const checkStatus=document.getElementById("checkStatus");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


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

    loadingCircle.style.display="block";
    loadingBar.style.backgroundColor="#c3fe95ff";
    document.getElementById("loadingStatus").innerText="Fetching";
    document.getElementById("loadingBarContainer").style.display="flex";

    const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    document.getElementById("loadingStatus").innerText="Loading";
    document.getElementById("loadingBarContainer").style.display="flex";
    await delay(3000);
    // loadingBar.style.backgroundColor="#c3fe95ff";
    document.getElementById("loadingStatus").innerText="Checking Data";
    await delay(3000);

    const data = await response.json();
    if(data.message!="User registered successfully."){
        loadingCircle.style.display="none";
        loadingBar.style.backgroundColor="#fe9795ff";
        document.getElementById("loadingStatus").innerText=data.message;
    }
    if (data.message === "User registered successfully.") {
        document.getElementById("loadingCircle").style.display="none";
        document.getElementById("checkStatus").style.display="block";
        loadingBar.style.backgroundColor="#c3fe95ff";
            document.getElementById("loadingStatus").innerText="User registered successfully";
            await delay(1000);
            window.location.href = "http://127.0.0.1:3000/frontend/pages/login/login.html";

    }
});

