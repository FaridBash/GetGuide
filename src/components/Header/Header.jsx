
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css'


export default function Header(){
    const [myUser, setMyUser]=useState(JSON.parse(localStorage.getItem('onlineUser'))??null)
    const nav=useNavigate();
    useEffect(()=>{

        console.log("Myuser",myUser);
        
    },[myUser])


    const LinkStyles=({isActive})=>{
        console.log('isActive',isActive);
        return {
            borderBottom: isActive? '1px solid orange':'',
            color: isActive? 'orange':'white'
        }
    }


    return <div id='main-container'>
    <div id="header">
        <div id='header-col1'>
        <img src=".\assets\get-a-guide-high-resolution-logo-color-on-transparent-background.png" alt="logo" id='header-logo' />
        <ul id='myMenu'>
            <NavLink style={LinkStyles} className='link' to={'/home'}>Tours</NavLink>
            { JSON.parse(localStorage.getItem('onlineUser'))!=null?
                <NavLink style={LinkStyles} className='link' to={'/guideDash/openauctions'}>DashBoard </NavLink>:undefined
            }
            <NavLink className='link'>About us</NavLink>
        </ul>
        </div>
        <div id='header-col2'>

        {JSON.parse(localStorage.getItem('onlineUser'))!=null? <div id='user-logout'><p>Welcome {JSON.parse(localStorage.getItem('onlineUser')).firstName}</p> <button onClick={()=>{
            localStorage.setItem('onlineUser', null);
            setMyUser(JSON.parse(localStorage.getItem('onlineUser')))
            nav('/');
        }}>Logout</button></div>:
        <NavLink to={'/'}>Sign-in</NavLink>
    }
    </div>
    </div>
    <div id='outlet'>
    <Outlet/>
    </div>
    </div>
}