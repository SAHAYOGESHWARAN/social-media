document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('postForm').addEventListener('submit', createPost);
    loadPosts();
});

async function loadPosts() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/posts', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const posts = await response.json();
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <p>${post.content}</p>
            <button onclick="likePost('${post._id}')">Like</button>
            <span>${post.likes.length} Likes</span>
            <form id="commentForm-${post._id}">
                <input type="text" placeholder="Add a comment">
                <button type="submit">Comment</button>
            </form>
            <div id="comments-${post._id}"></div>
        `;
        postList.appendChild(postDiv);
        loadComments(post._id);
        document.getElementById(`commentForm-${post._id}`).addEventListener('submit', (event) => {
            event.preventDefault();
            commentOnPost(post._id);
        });
    });
}
async function createPost() {
    const formData = new FormData();
    formData.append('content', document.getElementById('contentInput').value);
    formData.append('media', document.getElementById('mediaInput').files[0]);

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    const post = await response.json();
    displayPost(post);
    document.getElementById('contentInput').value = '';
    document.getElementById('mediaInput').value = '';
}


async function likePost(postId) {
    const token = localStorage.getItem('token');

    await fetch('/api/posts/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId }),
    });
    loadPosts();
}

async function commentOnPost(postId) {
    const comment = document.querySelector(`#commentForm-${postId} input`).value;
    const token = localStorage.getItem('token');

    await fetch('/api/posts/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId, comment }),
    });
    loadComments(postId);
}

async function loadComments(postId) {
    const response = await fetch(`/api/posts/${postId}`);
    const post = await response.json();
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.innerHTML = '';

    post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment.comment;
        commentsDiv.appendChild(commentDiv);
    });
}
