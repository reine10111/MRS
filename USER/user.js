async function fetchPosts() {
    try {
        const response = await fetch('/api/posts'); // Make sure to replace with your actual API endpoint
        const posts = await response.json();

        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = ''; // Clear previous posts if any

        // Loop through each post and append it to the posts container
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-gray-900', 'text-white', 'p-4', 'rounded-lg');
            
            postElement.innerHTML = `
                <div class="flex items-center mb-4">
                    <img src="${post.author_image}" alt="User profile picture" class="rounded-full w-12 h-12 mr-4" height="50" width="50">
                    <div>
                        <div class="flex items-center">
                            <span class="font-bold">${post.author}</span>
                            <span class="text-gray-400 ml-2">${post.username}</span>
                        </div>
                        <span class="text-gray-400 text-sm">${new Date(post.timestamp).toLocaleString()}</span>
                    </div>
                </div>
                <p class="mb-4">${post.content}</p>
                <p class="text-gray-400 mb-4">${post.description}</p>
                <img src="${post.image}" alt="Post image" class="rounded-lg mb-4" height="400" width="600">
                <div class="flex items-center justify-between text-gray-400">
                    <span>${post.likes} Likes</span>
                    <div class="flex items-center">
                        <i class="far fa-heart mr-2"></i>
                        <i class="far fa-comment mr-2"></i>
                        <i class="fas fa-share"></i>
                    </div>
                </div>
            `;

            // Append the post element to the posts container
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Fetch posts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);

// Assuming you have an API endpoint that returns announcements in JSON format
document.addEventListener('DOMContentLoaded', function() {
    fetchAnnouncements();
});

function fetchAnnouncements() {
    // Example API URL
    const apiUrl = 'https://yourbackend.com/api/announcements'; // Replace with actual API endpoint

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Create a new announcement element for each item in the data
            const container = document.getElementById('announcement-container');
            container.innerHTML = ''; // Clear the container first

            data.forEach(announcement => {
                const announcementDiv = document.createElement('div');
                announcementDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow');
                
                const userSpan = document.createElement('span');
                userSpan.classList.add('font-bold');
                userSpan.textContent = `@${announcement.username}`;

                const dateSpan = document.createElement('span');
                dateSpan.classList.add('text-gray-400', 'ml-2');
                dateSpan.textContent = announcement.date;

                const titleP = document.createElement('p');
                titleP.classList.add('font-bold', 'mb-2');
                titleP.textContent = announcement.title;

                const contentP = document.createElement('p');
                contentP.classList.add('text-gray-600', 'mb-4');
                contentP.textContent = announcement.content;

                const commentButton = document.createElement('button');
                commentButton.classList.add('bg-gray-800', 'text-white', 'py-1', 'px-4', 'rounded-lg', 'hover:bg-gray-700');
                commentButton.textContent = 'Comment';
                commentButton.onclick = function() {
                    alert('Comment functionality will be added here.');
                };

                // Append all the elements to the announcement div
                announcementDiv.appendChild(userSpan);
                announcementDiv.appendChild(dateSpan);
                announcementDiv.appendChild(titleP);
                announcementDiv.appendChild(contentP);
                announcementDiv.appendChild(commentButton);

                // Append the new announcement to the container
                container.appendChild(announcementDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
        });
}

// Function to show comment input field when the "Comment" button is clicked
function showCommentField(button) {
    // Create a new input field
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Write a comment...";
    inputField.className = "w-full p-2 border border-gray-300 rounded-lg mt-2";

    // Replace the button with the input field
    button.replaceWith(inputField);
    inputField.focus();

    // Event listener to detect clicks outside the input field
    function handleClickOutside(event) {
        if (event.target !== inputField) {
            // Create a new Comment button
            let newButton = document.createElement("button");
            newButton.className = "bg-gray-800 text-white py-1 px-4 rounded-lg hover:bg-gray-700";
            newButton.innerText = "Comment";
            newButton.onclick = function () {
                showCommentField(newButton);
            };

            // Replace the input field with the Comment button
            inputField.replaceWith(newButton);

            // Remove event listener once it's used
            document.removeEventListener("click", handleClickOutside);
        }
    }

    // Add event listener to detect clicks outside the input field
    setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
    }, 0);
}

// Function to toggle like (heart) and update like count
function toggleLike(icon) {
    let postContainer = icon.closest(".bg-gray-900"); // Find parent post
    let likeCountSpan = postContainer.querySelector(".like-count"); // Find like count element
    let likeCount = parseInt(likeCountSpan.textContent.replace("K", "000")) || 0; // Convert to number

    if (icon.classList.contains("fas")) {
        icon.classList.replace("fas", "far"); // Unliked state
        icon.style.color = ""; // Default color
        likeCount--; // Decrease like count
    } else {
        icon.classList.replace("far", "fas"); // Liked state
        icon.style.color = "red"; // Change color
        likeCount++; // Increase like count
    }

    likeCountSpan.textContent = likeCount >= 1000 ? (likeCount / 1000).toFixed(1) + "K" : likeCount; // Format large numbers
}

// Function to show comment input field when clicking the comment icon
function toggleCommentField(icon) {
    let parentDiv = icon.closest(".bg-gray-900"); // Find the parent post container

    let existingInput = parentDiv.querySelector(".comment-input");
    if (existingInput) {
        existingInput.remove(); // Remove input if already exists
        return;
    }

    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Write a comment...";
    inputField.className = "w-full p-2 border border-gray-300 rounded-lg mt-2 comment-input";

    parentDiv.appendChild(inputField);
    inputField.focus();

    function handleClickOutside(event) {
        if (event.target !== inputField && event.target !== icon) {
            inputField.remove(); // Remove input if clicked outside
            document.removeEventListener("click", handleClickOutside);
        }
    }

    setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
    }, 0);
}

// Function to handle heart (like) reactions
function toggleLike(icon) {
    if (icon.classList.contains("fas")) {
        icon.classList.replace("fas", "far"); // Unliked state
        icon.style.color = ""; // Default color
    } else {
        icon.classList.replace("far", "fas"); // Liked state
        icon.style.color = "red"; // Red color for liked
    }
}



function closeRequestSection() {
    const section = document.querySelector('.request-section');
    if (section) {
      section.style.display = 'none';
    }
  }
  


function previewFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    const filePreviewContainer = document.getElementById('filePreviewContainer');
    const filePreview = document.getElementById('filePreview');
    const uploadButton = document.getElementById('uploadButton');
    const replaceButton = document.getElementById('replaceButton');
  
    // Reset preview if no file selected (e.g. user cancels)
    if (!file) {
      filePreview.innerHTML = '';
      filePreviewContainer.classList.add('hidden');
      uploadButton.style.display = 'flex';
      replaceButton.style.display = 'none';
      return;
    }
  
    // Hide upload button
    uploadButton.style.display = 'none';
  
    // Show container and clear old preview
    filePreviewContainer.classList.remove('hidden');
    filePreview.innerHTML = '';
  
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Preview Image';
        img.className = 'preview-img';
        filePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.style.maxWidth = '100%';
      video.style.maxHeight = '300px';
      filePreview.appendChild(video);
    }
  
    // Show replace button
    replaceButton.style.display = 'inline-block';
}
  

fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-container').innerHTML = data;
})
.catch(error => console.error('Error loading navbar:', error));