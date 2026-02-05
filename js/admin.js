import { db } from "./firebase.js";
import { ref, onValue, push, set, onDisconnect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let currentId=null;
let currentRef=null;

const usersDiv=document.getElementById("users");
const messagesDiv=document.getElementById("messages");
const input=document.getElementById("input");
const sound=document.getElementById("notifySound");

set(ref(db,"system/adminOnline"),true);
onDisconnect(ref(db,"system/adminOnline")).set(false);

onValue(ref(db,"chats"),snap=>{
  usersDiv.innerHTML="";
  snap.forEach(c=>{
    const div=document.createElement("div");
    div.className="user-item";
    div.textContent="Пользователь • "+c.key.slice(-4);
    div.onclick=()=>openChat(c.key,div);
    usersDiv.append(div);
  });
});

function openChat(id,el){
  document.querySelectorAll(".user-item").forEach(e=>e.classList.remove("active"));
  el.classList.add("active");
  currentId=id;
  currentRef=ref(db,"chats/"+id);

  onValue(currentRef,s=>{
    messagesDiv.innerHTML="";
    s.forEach(m=>{
      const d=m.val();
      const w=document.createElement("div");
      w.className="message "+d.from;

      const a=document.createElement("div");
      a.className="avatar";
      a.textContent=d.from==="admin"?"🛠":"👤";

      const b=document.createElement("div");
      const meta=document.createElement("div");
      meta.className="meta";
      meta.textContent=`${d.name} • ${new Date(d.time).toLocaleTimeString()}`;

      const bub=document.createElement("div");
      bub.className="bubble";
      bub.textContent=d.text;

      b.append(meta,bub);
      w.append(a,b);
      messagesDiv.append(w);
    });
    sound.play();
    messagesDiv.scrollTop=messagesDiv.scrollHeight;
  });
}

window.send=()=>{
  if(!currentRef)return;
  push(currentRef,{
    from:"admin",
    name:"Поддержка",
    text:input.value,
    time:Date.now()
  });
  input.value="";
};

window.closeChat=()=>{
  if(currentId)set(ref(db,"closed/"+currentId),true);
};

window.ban=()=>{
  if(currentId)set(ref(db,"bans/"+currentId),true);
};
