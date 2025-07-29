const profilePhoto = document.getElementById("profilePicture");
let welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");
const allPostsContainer = document.getElementById("allPostsContainer");
const loginFirst = document.getElementById("loginFirst");
const sideBar=document.getElementById("sidebarContainer");
const pillbarContainer=document.getElementById("pillbarContainer");

const allPostsMapping=async (decoded)=>{
    const res = await fetch(`http://localhost:5000/api/
        ${decoded.username}/home/posts`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        let allPostsResponse=await res.json();
        console.log(allPostsResponse);

        const posts=allPostsResponse.map(post=>`<div id="postBox">
                <div id="postAdminDetailsBar"><button id="postProfilePicture"></button>${post.username}</div>
                <div id="titleBar">${post.titleContent}</div>
                <div id="textBar">${post.textContent}</div>
                <div id="postContent"><img
                        src="${post.imageContent}"
                        alt=""></div>
                <div id="postDetailsBar">
                    <div><button id="likeButton"><i class="fa fa-thumbs-o-up"></i></button><button id="dislikeButton"><i class="fa fa-thumbs-o-down"></i></button></div>
                    <div id="postedAt">${post.postedAt}</div>
                </div>
            </div>`);
        
        allPostsContainer.innerHTML=posts.join("");
}

const homeFunction = async () => {

    let usernameToken = localStorage.getItem("token");
    if (!usernameToken) {
        pillbarContainer.style.display="none";
        welcomeMessage.innerHTML = `<a href="http://127.0.0.1:3000/frontend/pages/login/login.html">Login</a>`;
        logoutButton.style.display = "none";
        allPostsContainer.style.display="none";
        sideBar.style.display="none";
        loginFirst.style.display="flex";
    }
    else {
        loginFirst.style.display="none";
        console.log(usernameToken);
        const decoded = jwt_decode(usernameToken);
        await allPostsMapping(decoded);
        allPostsContainer.style.display="flex";
        console.log(decoded.username);
        const userDetailsResponse = await fetch(`http://localhost:5000/api/${decoded.username}/home/userDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const userDetails = await userDetailsResponse.json();
        console.log(userDetails);
        profilePhoto.style.backgroundImage = `url(${userDetails.profileImageUrl}`;
        welcomeMessage.innerText = `Welcome, ${userDetails.name}`;
    }
}

document.getElementById("logoutButton").onclick = async () => {
    localStorage.removeItem("token");
    console.log("redirecting");
        window.location.href = "http://127.0.0.1:3000/frontend/pages/login/login.html";
    console.log("done");
}
document.getElementById("pillbarLogoutButton").onclick = async () => {
    localStorage.removeItem("token");
    console.log("redirecting");
    window.location.href = "http://127.0.0.1:3000/frontend/pages/login/login.html";
    console.log("done");
}

homeFunction();

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get references to the file input and the image preview element
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const createPostDialogBox=document.getElementById('createPostFormContainer');
const createPostDialogBoxCancelButton=document.getElementById("btn btn-cancel");
// const allPostsContainer=document.getElementById("allPostsContainer");
    
createPostDialogBox.style.display='none';

// Listen for changes on the file input
imageInput.addEventListener('change', function () {
    // Check if a file was selected
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }

        reader.readAsDataURL(this.files[0]);
    } else {
        imagePreview.style.display = 'none';
        imagePreview.src = '#'; // Reset src
    }
});

document.getElementById("createPostSidebar").onclick=()=>{
    allPostsContainer.style.display="none";
    createPostDialogBox.style.display="flex";
}

createPostDialogBoxCancelButton.onclick=()=>{
    allPostsContainer.style.display="flex";
    createPostDialogBox.style.display="none";
}

