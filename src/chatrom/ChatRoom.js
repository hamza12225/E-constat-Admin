import { Link, useParams } from 'react-router-dom';
// import { chatRooms } from '../../data/chatRooms';
import './chatroom.css';
import React, { useEffect, useState } from "react";
import {db ,authentication} from '../firebase-config';
import { addDoc,collection, serverTimestamp ,getDocs,onSnapshot,query,orderBy,getDoc,doc, setDoc } from 'firebase/firestore';
import { set } from 'firebase/database';
import { useCallback } from 'react';




// ...

function ChatRoom() {
    const params = useParams();
    const [Messages, setMessages] = useState([]);
    const [userdata, setuserdata] = useState([]);

    // const room = chatRooms.find((x) => x.id === params.id);
    // if (!room) {
        // TODO: 404
    // }
    const filterid = window.location.pathname.split("/")[2]

    const getUser = async() => {
        const docRef = doc(db, "Constateur",filterid);
        const docSnap = await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setuserdata(docSnap.data());
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
    
      }

    // send message must have id of admin
      
    async function sendMessage(roomId, user, text) {
        await getUser();
        try {
            await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
                uid: 'Adminxxx',
                displayName: 'Admin',
                text: text.trim(),
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error(error);
        }
    }

    function MessageInput({ roomId }) {
        const { user } = authentication;
        const [value, setValue] = useState('');
    
    
        const handleSubmit =async  (event) => {
            event.preventDefault();
            await sendMessage(roomId, user, value);
            setValue('');
        };
    
        return (
            <form onSubmit={handleSubmit} className="message-input-container">
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="message-input"
                />
                <button type="submit" className="send-message">
                    Envoyer
                </button>
            </form>
        );
    }


    function getMessages(roomId,callback) {
        const q = query(collection(db, 'chat-rooms', roomId, 'messages'), orderBy('timestamp'));
        
        return onSnapshot(q, (querySnapshot) => {
            const messages = [];
    
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            callback(messages);
        });
    }
    
    

    function useMessages(roomId) {
        const [messages, setMessages] = useState([]);
    
        useEffect(() => {
            const unsubscribe = getMessages(roomId, setMessages);
            return unsubscribe;
        }, [roomId]);
    
        return messages;
    }

    function MessageList({ roomId }) {
        const containerRef = React.useRef(null);
        const { user } = authentication;
        const messages = useMessages(roomId);
    
        React.useLayoutEffect(() => {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
            
        });
    
        return (
            <div className="message-list-container" ref={containerRef}>
                <ul className="message-list">
                    {messages.map((x) => (
                        <Message
                            key={x.id}
                            message={x}
                            isOwnMessage={x.uid !== filterid}
                        />
                    ))}
                    
                </ul>
            </div>
        );
    }
    
    function Message({ message, isOwnMessage }) {
        const { displayName, text } = message;
        
        return (
            <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
                <h4 className="sender">{isOwnMessage ? 'Moi' : displayName}</h4>
                <div>{text}</div>
            </li>
        );
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className='constainer'>
             <>
            <h2>texte</h2>
            <div>
                <Link to="/Message">⬅️ Back to all rooms</Link>
            </div>
            <div className="messages-container">
                <MessageList roomId={filterid} />
                <MessageInput roomId={filterid} />
            </div>
        </>

        </div>

    );
}

export { ChatRoom };