import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";


function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleRefresh = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
    
  };
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const Getinfo = async () => {
      if (localStorage.getItem("chat-app-user")) {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
        
      }
      else{
        navigate("login");
      }
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }

    };
    Getinfo();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {!localStorage.getItem("chat-app-user") ? (
        navigate("/login")
      ) : (
        <Container>
        
          <div className="container">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
              Button={handleRefresh} 
            />
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 90vw;
    border-radius:2rem ;
    margin-top:4rem ;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    
  }
  @media  screen and (max-device-width: 1080px) {
    display:grid ;
    .container{
      grid-template-columns: 30% 70%;
      height: 70vh;
       width: 90vw;
    }  
    }
`;
