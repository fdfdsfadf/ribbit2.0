import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// FIREBASE STUFF DO NOT CHANGE IT OR YOU WILL SCREW IT UP
const firebaseConfig = {
  apiKey: "AIzaSyB2jIkZnOnM8kGTVSplScgndMxr51w0iIA",
  authDomain: "ribbit2-7a62e.firebaseapp.com",
  projectId: "ribbit2-7a62e",
  storageBucket: "ribbit2-7a62e.firebasestorage.app",
  messagingSenderId: "845360302381",
  appId: "1:845360302381:web:577e35983624fceb1c2ba4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.sendMessage = function () {
  const name = document.getElementById('chat-name').value.trim() || 'Anonymous';
  const text = document.getElementById('chat-input').value.trim();
  if (!text) return;

  push(ref(db, 'messages'), {
    name,
    text,
    timestamp: Date.now()
  });

  document.getElementById('chat-input').value = '';
};

onChildAdded(ref(db, 'messages'), snapshot => {
  const { name, text, timestamp } = snapshot.val();
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = `[${name}] ${text}`;
  document.getElementById('chat-feed').appendChild(msg);
  document.getElementById('chat-feed').scrollTop = document.getElementById('chat-feed').scrollHeight;
});
