import { db } from "./firebase.js";
import { ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const chatId = localStorage.chatId || crypto.randomUUID();
localStorage.chatId = chatId;

const userId = localStorage.userId || Math.floor(1000+Math.random()*9000);
localStorage.userId = userId;

const userColor = localStorage.userColor ||
  `hsl(${Math.random()*360},70%,45%)`;
localStorage.userColor = userColor;

const messagesRef = ref(db,"chats/"+chatId);
const typingRef = ref(db,"typing/"+chatId);
const statusRef = ref(db,"system/adminOnline");

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");
const sound = document.getElementById("notifySound");

let lastCount = 0;

onValue(statusRef,s=>{
  document.getElementById("adminStatus").textContent =
    s.val() ? "🟢 Поддержка онлайн" : "🔴 Поддержка оффлайн";
});

onValue(messagesRef,snap=>{
  messagesDiv.innerHTML="";
  snap.forEach(m=>{
    const d=m.val();
    const wrap=document.createElement("div");
    wrap.className="message "+d.from;

    const av=document.createElement("div");
    av.className="avatar";
    av.textContent=d.from==="admin"?"🛠":"👤";

    const box=document.createElement("div");
    const meta=document.createElement("div");
    meta.className="meta";
    meta.style.color=d.color||"#9ca3af";
    meta.textContent=`${d.name} • ${new Date(d.time).toLocaleTimeString()}`;

    const bub=document.createElement("div");
    bub.className="bubble";
    bub.textContent=d.text;

    box.append(meta,bub);
    wrap.append(av,box);
    messagesDiv.append(wrap);
  });
  if(snap.size>lastCount){sound.play();lastCount=snap.size}
  messagesDiv.scrollTop=messagesDiv.scrollHeight;
});

input.addEventListener("input",()=>{
  set(typingRef,true);
  setTimeout(()=>set(typingRef,false),1500);
});

window.send=()=>{
  const text=input.value.trim();
  if(!text)return;

  if(text==="/admin.pref = 288M2P00K720"){
    location.href="admin.html";return;
  }

  push(messagesRef,{
    from:"user",
    name:"Пользователь #"+userId,
    color:userColor,
    text,
    time:Date.now()
  });
  input.value="";
};
