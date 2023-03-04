import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './HomeCard.css'



export default function HomeCard(props){
    

    return <div id="homecard-container">
        {/* <div id="img-name"> */}
        {/* <img src={props.image} alt="img" id="img-card"/> */}
        <h4>{props.name}</h4>
        <p>Catagory: {props.kinds}</p>
        
        {/* </div> */}
        <Link id="more-info-link" to={(`./${props.detailPage}`)  } >More Info</Link>
    </div>
}