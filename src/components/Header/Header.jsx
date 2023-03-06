
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css'


export default function Header(){
    const [myUser, setMyUser]=useState(JSON.parse(localStorage.getItem('onlineUser'))??null)
    const nav=useNavigate();
    useEffect(()=>{

        console.log("Myuser",myUser);
        
    },[myUser])
    return <div id='main-container'>
    <div id="header">
        <img src="src\assets\get-a-guide-low-resolution-logo-white-on-transparent-background.png" alt="logo" id='header-logo' />
        <ul id='myMenu'>
            <Link className='link' to={'/home'}>Tours</Link>
            <Link className='link' to={'/guidedash'}>DashBoard </Link>
            <Link className='link'>About us</Link>
        </ul>
        {myUser ? <div id='user-logout'><p>Welcome {myUser.firstName}</p> <button onClick={()=>{
            localStorage.setItem('onlineUser', null);
            setMyUser(JSON.parse(localStorage.getItem('onlineUser')))
            nav('/');
        }}>Logout</button></div>:
        <Link to={'/'}>Sign-in</Link>
        }
    </div>
    <div id='outlet'>
    <Outlet/>
    </div>
    </div>
}