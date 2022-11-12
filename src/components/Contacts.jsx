import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Contacts({
  contacts,
  currentUser,
  changeChat,
  Button,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="LOGO" className="logoimage" />
            <h3>Chatty</h3>
            <button onClick={Button} className="refresh">
              Load Contacts
            </button>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 70% 18%;
  overflow: hidden;
  background-color: #080420;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  padding: 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    margin-left: 1rem;
    .refresh {
      background-color: #997af0;
      position: relative;
      left: 30px;
      font-size: 0.6rem;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.5rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    .logoimage {
      height: 2.5rem;
    }
    h3 {
      color: white;
      
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.8rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    margin-top: 1rem;
    .avatar {
      img {
        height: 5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      margin-left: 1rem;
      h2 {
        color: white;
      }
    }
  }
`;
