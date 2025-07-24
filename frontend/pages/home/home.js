const usernameToken = localStorage.getItem("token");
console.log(usernameToken);
const decoded = jwt_decode(usernameToken);
console.log(decoded.username);

const homeFunction = async () => {

    const profilePhoto = document.getElementById("profilePicture");
    const welcomeMessage=document.getElementById("welcomeMessage");

    const userDetailsResponse = await fetch(`http://localhost:5000/api/${decoded.username}/home/userDetails`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    const userDetails = await userDetailsResponse.json();
    console.log(userDetails);
    profilePhoto.style.backgroundImage = `url(${userDetails.profileImageUrl})`;
    welcomeMessage.innerText=`Welcome, ${userDetails.name}`;

}

homeFunction();

