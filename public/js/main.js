const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
// get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
// console.log(username, room);

const socket = io();

// join chatroom
socket.emit('joinRoom', { username, room });

//get room and users
socket.on('roomUsers', ({ room, users }) =>{
    outputRoomName(room);
    outputUsers(users);
});

//message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    //get msg text
    const msg = e.target.elements.msg.value;

    //Emit msg to server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//output mesage to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// add room name to DOM
function outputRoomName (room) {
    roomName.innerText = room;
}

//add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}


var firebaseConfig = {
    apiKey: "AIzaSyB-JXHb1UDmiKlshHVQ946CMihHurWoj6E",
    authDomain: "realtime-chat-app-316e3.firebaseapp.com",
    projectId: "realtime-chat-app-316e3",
    storageBucket: "realtime-chat-app-316e3.appspot.com",
    messagingSenderId: "47533368208",
    appId: "1:47533368208:web:f5da3948f23df623be8915",
    measurementId: "G-PB80WFKC3Q"
  };