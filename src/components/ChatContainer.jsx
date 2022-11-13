import React ,{useEffect,useRef,useState}from "react";
import styled from "styled-components";
import Chatinput from "./Chatinput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
export default function ChatContainer({ currentChat,currentUser,socket}) {
  
  const [messages, setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getmessage=async()=>{
      const response=await axios.post(getAllMessageRoute,{
        from:currentUser._id,
        to:currentChat._id,
      });
      setMessages(response.data)
    }
    if(currentChat)
    {
      getmessage();
    }
  
  
   
  }, [currentChat])
  
  const handleSendMsg=async(msg)=>
 {
    await axios.post(sendMessageRoute,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
    });
    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      messages:msg,
    });
    const msgs=[...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
 };
 useEffect(() => {
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
 }, [])
 useEffect(() => {
   arrivalMessage&&setMessages((prev)=>[...prev,arrivalMessage])
 
   
 }, [arrivalMessage])
 useEffect(() => {
 scrollRef.current?.scrollIntoView({behaviour:"smooth"});
 
   
 }, [messages])
 
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-detail">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
             {
              messages.map((message)=>{
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf?"sended":"recieved"}`}>
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                )
              }
             )}
          </div>
         
          <Chatinput handleSendMsg={handleSendMsg}/>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
padding-top:1rem ;
display:grid ;
grid-template-rows:10% 78% 12% ;
gap:0.1rem;
overflow:hidden ;

.chat-header{
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
    padding:0.5rem;
    
    .user-detail{
        display:flex ;
        align-items:center ;
        gap:1rem;
        .avatar{
           img{
            height:3rem ;
           } 
        }
        .username{ 
            h3{
                color:white;
            }   
        }
    }
}
.chat-messages{
  padding:1rem 2rem ;
  display:flex;
  flex-direction:column ;
  gap:1rem;
  overflow:auto;
  &::-webkit-scrollbar{
    width:0.2rem;
    border-radius:1rem ;

  }

  .message{
    display:flex ;
    align-items:center ;
    .content{
      max-width:40% ;
      overflow-wrap:break-word ;
      padding:1rem;
      font-size:1.1rem ;
      border-radius:1rem ;
      color:#d1d1d1;
    }
  }
  .sended{
    justify-content:flex-end ;
    .content{
      background-color:#4f04ff21 ;
    }
  }
  .recieved{
    justify-content:flex-start ;
    .content{
      background-color:#9900ff20 ;
    }
  }
}
@media only screen and (max-device-width:1080px)
{
  grid-template-rows:10% 75% 15%;
  .chat-header{
    padding:0.5rem ;
    .user-detail{
        gap:0.5rem;
        .avatar{
           img{
            height:1.7rem ;
           } 
        }
        .username{ 
            h3{
                font-size:0.9rem ;
            }   
        }
    }
  }
  .chat-messages{
  padding:0.5rem 0.8rem ;
  gap:0.5rem;
  .message{
    .content{
      max-width:40% ;
    
      padding:0.5rem;
      font-size:0.7rem ;
    }
  }
}
}
`;
