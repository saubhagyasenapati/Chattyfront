import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logout from '../components/Logout'


export default function Navbar() {
  return (
    <Container>
    <div className='navbar'>
      <ul>
      <Link className="nav-link" aria-current="page" to="/">Chat</Link>
      <Link className="nav-link" aria-current="page" to="/login">Login</Link>
      <Link className="nav-link" aria-current="page" to="/register">Register</Link>
      <Link className="nav-link" aria-current="page" to="/login"><Logout/></Link> 
      </ul>
    </div>
    </Container>
    
  )
}

const Container=styled.div`
display:flex ;
justify-content:space-evenly ;
align-items:center ;
margin-top:1rem ;
background-color: #668cff;
padding:0.5rem ;
border-bottom-right-radius:2rem ;
border-top-left-radius:2rem ;
position:absolute ;
left:40% ;
ul{
 .nav-link{
  margin:1rem ;
  font-size:1.3rem ;
  color:white;
  text-decoration:none ;
  cursor: pointer;
 }
 
}
`
