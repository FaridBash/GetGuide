
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Header.css'


export default function Header(){
    const [myUser, setMyUser]=useState(JSON.parse(localStorage.getItem('onlineUser'))??null)
    
    useEffect(()=>{

        console.log("Myuser",myUser);
        
    },[myUser])
    return <div id='main-container'>
    <div id="header">
        
        <ul id='myMenu'>
            <Link className='link'>Our Tours</Link>
            <Link className='link' to={'/guidedash'}>DashBoard </Link>
            <Link className='link'>About us</Link>
        </ul>
        {myUser ? <div id='user-logout'><h4>Welcome {myUser.firstName}</h4> <button onClick={()=>{
            localStorage.setItem('onlineUser', null);
            setMyUser(JSON.parse(localStorage.getItem('onlineUser')))
        }}>Logout</button></div>:
        <Link to={'/signin'}>Sign-in</Link>
        }
    </div>
    <div id='outlet'>
    <Outlet/>
    </div>
    </div>
}