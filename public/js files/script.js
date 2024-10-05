let socket = io();
let input = document.querySelector('#msginput');
let form = document.querySelector('#form');
let sendchat = document.querySelector('#my_chat');
let recievechat = document.querySelector('#opposite_chat');
let chatbox = document.querySelector('#chatbox');
let onlinestatus = document.querySelector('#onlinelist');
let namebox = document.querySelector('#nameinput');
let enternameinput = document.querySelector('#enternameinput');
let enterinchatbtn = document.querySelector('#enterinchat');
let sendaudio = document.querySelector('#sendaudio');
let receiveaudio = document.querySelector('#receiveaudio');

// enter name things
enterinchatbtn.addEventListener('click', (e) => {
    namebox.style.display = "none";
    socket.emit('user-joined', enternameinput.value);
    e.preventDefault();
})

socket.on('user-list', (users) => {
    document.querySelector('.onlinelistbtn').innerHTML = `${users.length} Connected`;
    onlinestatus.innerHTML = "";
    
    users.forEach(user => {
onlinestatus.innerHTML += `<div class="flex justify-center bg-gray-800 py-1 px-3 mx-1 my-2 rounded">
<p class="text-lg tracking-wide">&nbsp;${user}</p>
</div>`;
    });
});

document.querySelector('.onlinelistbtn').addEventListener('click', () => {
    document.querySelector('#onlineuser').style.display = "block";
})

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector("#onlineuser").style.display = "none";
})


// send message by form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value);
        sendaudio.play();
        chatbox.innerHTML += `<div class="message right bg-gray-900 p-3 rounded my-2">
            <p id="rightchatsender" class="text-sm text-green-500 float-right clear-both">You</p>
            <p class="text-white float-right clear-both m-2">${input.value}</p>
            <i class="float-left text-gray-500 text-sm"></i>
        </div>`;
        input.value = "";
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});

socket.on('chat message', (data) => {
    receiveaudio.play();
    chatbox.innerHTML += `<div class="message left bg-gray-900 p-3 rounded my-2">
            <p id="leftchatsender" class="text-sm text-blue-500">${data.user}</p>
            <p id="leftchat" class="text-white m-2">${data.msg}</p>
            <i class="float-right text-gray-500 text-sm"></i>
        </div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
})