import React, { useState } from "react";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";
import { Input, Button } from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";

import "./SendMessage.css";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const [user] = useAuthState(auth);
  console.log('user:', msg )
  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div>
      <form className="sendMessage__form" onSubmit={sendMessage}>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
        {user ? ( <Button type="submit" color="success">
        Send
      </Button>) : (<p >Mesaj göndermek için giriş yapmalısınız! </p>)}
       
      </form>
    </div>
  );
}

export default SendMessage;
