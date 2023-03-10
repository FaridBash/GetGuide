
import { useState } from "react";
import './DashboardNav.css'
import { Link, NavLink, Outlet } from "react-router-dom";

export default function DasboardNav(){

    const [onlineUser, setOnlineUser]=useState(JSON.parse(localStorage.getItem('onlineUser'))??null);


     const LinkStyles=({isActive})=>{
        console.log('isActive',isActive);
        return {
            boxShadow: isActive? 'rgba(238, 234, 234, 0.271) 0px 0px 0px, rgba(255, 255, 255, 0.22) 0px 0px 2px 2px':'',
            color: isActive? 'orange':'white'
        }
    }
 

    return <div id="dash-nav">
        <ul>
            <NavLink style={LinkStyles} className="dash-nav-link" to={'/guideDash/openauctions'}>Auctions</NavLink>
            {onlineUser.role==='guide'? <NavLink style={LinkStyles}  className="dash-nav-link" to={'/guideDash/openauctions/JoinedAuctions'}>Joined Auctions</NavLink>:<NavLink to={'/guideDash/closedauctions'} style={LinkStyles} className="dash-nav-link">Closed Auctions</NavLink>}
            {onlineUser.role==='guide'? <NavLink style={LinkStyles}  className="dash-nav-link" to={'/guideDash/openauctions/Won'}>Auctions you won</NavLink>:<div></div>}
        </ul>
        <Outlet/>
    </div>
}