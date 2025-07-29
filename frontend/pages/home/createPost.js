// Get references to the file input and the image preview element
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const createPostDialogBox=document.getElementById('createPostFormContainer');
const allPostsContainer=document.getElementById("allPostsContainer");
    
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
    createPostDialogBox.style.display="block";
}


