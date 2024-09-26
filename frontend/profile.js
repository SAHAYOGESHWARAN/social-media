document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('profileForm').addEventListener('submit', updateProfile);
    loadProfile();
});

async function loadProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/profiles', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const profile = await response.json();
    document.getElementById('bio').value = profile.bio;
    document.getElementById('profilePicture').value = profile.profilePicture;
    document.getElementById('profileInfo').innerHTML = `
        <h2>Profile Information</h2>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Profile Picture:</strong> <img src="${profile.profilePicture}" alt="Profile Picture" width="100"></p>
    `;
}

async function updateProfile(event) {
    event.preventDefault();
    const bio = document.getElementById('bio').value;
    const profilePicture = document.getElementById('profilePicture').value;
    const token = localStorage.getItem('token');

    await fetch('/api/profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio, profilePicture }),
    });
    loadProfile();
}


async function loadProfile() {
    // existing code...
    const friendList = document.getElementById('friendList');
    friendList.innerHTML = ''; // Clear existing friends
    profile.friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend; // Assuming friend is an object or contains a username
        friendList.appendChild(li);
    });
}

async function sendFriendRequest(event) {
    event.preventDefault();
    const friendId = document.getElementById('friendId').value;
    const token = localStorage.getItem('token');

    await fetch('/api/profiles/send-friend-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ friendId }),
    });
    loadProfile(); // Refresh the profile to see updated friends
}

async function loadProfile() {
    // existing code...
    loadNotifications();
}

async function loadNotifications() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/notifications', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const notifications = await response.json();
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';
    
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification.message;
        notificationList.appendChild(li);
    });
}


const ProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // New field
});

document.getElementById('updateProfileButton').addEventListener('click', updateProfile);

async function updateProfile() {
    const formData = new FormData();
    formData.append('profilePicture', document.getElementById('profilePictureInput').files[0]);

    const response = await fetch(`/api/profile/${userId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    const updatedProfile = await response.json();
    displayProfile(updatedProfile);
}


document.getElementById('friendRequestForm').addEventListener('submit', sendFriendRequest);
