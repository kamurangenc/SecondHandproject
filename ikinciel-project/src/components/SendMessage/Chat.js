import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase";
import SendMessage from "./SendMessage";
import "./Chat.css";

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      <div className="page">
        <div>
          <SendMessage scroll={scroll} />
        </div>
        <div className="msgs">
          {messages.map(({ id, text, photoURL, uid }) => (
            <div>
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <img src={photoURL} alt="" />
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <span ref={scroll}></span>
      </div>
    </div>
  );
}

export default Chat;
