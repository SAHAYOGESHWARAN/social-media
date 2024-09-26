const recipientId = 'RECIPIENT_ID'; // Replace with actual recipient ID

document.getElementById('sendButton').addEventListener('click', sendMessage);
loadMessages();

async function sendMessage() {
    const content = document.getElementById('messageInput').value;
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recipientId, content })
    });
    const message = await response.json();
    displayMessage(message);
    document.getElementById('messageInput').value = '';
}

async function loadMessages() {
    const response = await fetch(`/api/messages/${recipientId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const messages = await response.json();
    messages.forEach(displayMessage);
}

function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const div = document.createElement('div');
    div.textContent = `${message.sender.username}: ${message.content}`;
    messageContainer.appendChild(div);
}
