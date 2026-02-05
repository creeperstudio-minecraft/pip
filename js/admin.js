import { db } from "./firebase.js";
import { ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let currentChat = null;

const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

const chatsRef = ref(db, "chats");

onValue(chatsRef, snap => {
  usersDiv.innerHTML = "";
  snap.forEach(chat => {
    const div = document.createElement("div");
    div.className = "user";
    div.textContent = chat.key;
    div.onclick = () => openChat(chat.key);
    usersDiv.appendChild(div);
  });
});

function openChat(id) {
  currentChat = ref(db, "chats/" + id);
  onValue(currentChat, snap => {
    messagesDiv.innerHTML = "";
    snap.forEach(m => {
      const div = document.createElement("div");
      div.className = "msg " + m.val().from;
      div.textContent = m.val().text;
      messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

window.send = () => {
  if (!currentChat) return;
  push(currentChat, {
  from: "admin",
  name: "Поддержка",
  text: input.value,
  time: Date.now()
});
  input.value = "";
};

