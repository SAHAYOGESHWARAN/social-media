document.getElementById('userSearch').addEventListener('input', searchUsers);
document.getElementById('postSearch').addEventListener('input', searchPosts);

async function searchUsers() {
    const query = document.getElementById('userSearch').value;
    const response = await fetch(`/api/search/users?query=${query}`);
    const users = await response.json();
    displayResults(users, 'Users');
}

async function searchPosts() {
    const query = document.getElementById('postSearch').value;
    const response = await fetch(`/api/search/posts?query=${query}`);
    const posts = await response.json();
    displayResults(posts, 'Posts');
}

function displayResults(items, type) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = `<h2>${type} Results</h2>`;
    items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = type === 'Users' ? item.username : item.content;
        resultsDiv.appendChild(div);
    });
}
