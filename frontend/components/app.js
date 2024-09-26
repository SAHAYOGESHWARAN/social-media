document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', registerUser);
    document.getElementById('loginForm').addEventListener('submit', loginUser);
    document.getElementById('postForm').addEventListener('submit', createPost);
});

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    alert('User registered successfully');
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('post-container').style.display = 'block';
        loadPosts();
    } else {
        alert(data.message);
    }
}

async function loadPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<strong>${post.userId.username}</strong>: ${post.content}`;
        postsContainer.appendChild(postElement);
    });
}

async function createPost(event) {
    event.preventDefault();
    const content = document.getElementById('postContent').value;
    const token = localStorage.getItem('token');

    await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
    });
    loadPosts();
    document.getElementById('postContent').value = ''; // Clear the input
}
