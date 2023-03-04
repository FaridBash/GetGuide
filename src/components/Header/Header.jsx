
import { Link, Outlet } from 'react-router-dom'
import './Header.css'


export default function Header(){



    return <div id='main-container'>
    <div id="header">
        
        <ul id='myMenu'>
            <Link className='link'>Our Tours</Link>
            <Link className='link'>DashBoard </Link>
            <Link className='link'>About us</Link>
        </ul>
        <Link>Sign-in</Link>
    </div>
    <div id='outlet'>
    <Outlet/>
    </div>
    </div>
}