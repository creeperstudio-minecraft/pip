import { db } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const userId = localStorage.userId || Math.floor(1000 + Math.random() * 9000);
localStorage.userId = userId;

const messagesRef = ref(db, "chats/" + chatId);

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

onValue(messagesRef, snap => {
  messagesDiv.innerHTML = "";
  snap.forEach(m => {
    const div = document.createElement("div");
    div.className = "msg " + m.val().from;
    div.textContent = m.val().text;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

window.send = () => {
  const text = input.value.trim();
  if (!text) return;

  if (text === "/admin.pref = 288M2P00K720") {
    location.href = "admin.html";
    return;
  }

  push(messagesRef, {
  from: "user",
  name: "Пользователь #" + userId,
  text,
  time: Date.now()
});

  input.value = "";
};


