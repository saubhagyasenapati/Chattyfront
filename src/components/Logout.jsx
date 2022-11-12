import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {MdOutlineLogout} from "react-icons/md"
export default function Logout() {
 
    const navigate=useNavigate();

    
    const handleClick=async()=>
    {
        localStorage.clear()
      
        navigate("/login");
    };
  return (
    <Button onClick={handleClick}>
        <MdOutlineLogout/>
    </Button>
  )
}
const Button=styled.button`
/* display:flex ;
justify-content:center ;
align-items:center ; */
padding:0.5rem ;
border-radius:0.5rem ;
background-color: #99b3ff ;
border:none;
cursor: pointer;
svg{
    font-size:1.3rem ;
}
`