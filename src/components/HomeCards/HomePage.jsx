import { useEffect, useState } from "react";
import HomeCard from "./HomeCards";
import './HomePage.css'

export default function HomePage(){
const [isLoading, setIsLoadind]=useState(false);
const [placesData, setPlacesData]=useState([]);
const [placeImages, setPlacesImage]=useState([]);
const apiK='5ae2e3f221c38a28845f05b61634580f311958ac6a07a129cd0f14cd'
const url= `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=34.909609&lon_max=35.575916&lat_min=29.503376&lat_max=33.122639&src_geom=osm&src_attr=osm&rate=3&format=json&limit=10&apikey=${apiK}`



useEffect(()=>{
   
    try {
        Promise.all([
            fetchData(),
            getImageLink(),
        ]).then((placesData, placeImages)=>{
            console.log('placesData:', placesData);
            console.log('placeImages: ',placeImages);
        })
    } catch (error) {
        
    }
    
},[])
  



async function fetchData(){

      try {
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setPlacesData(data);
            data.forEach(e => {
                setInterval(() => {
                    getImageLink(e);
                }, 500);
            });
            
          });
      } catch (error) {console.log("Couldn't fetch");}

}


function getImageLink(d){
    
        
        try {
            
            fetch(`https://api.opentripmap.com/0.1/en/places/xid/${d.xid}?apikey=${apiK}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data){
                    console.log("Placedata for image",data.preview.source);
                    d.image=data.preview.source;
                    setPlacesImage(data);
                    console.log("object",data);
                }
                
            });
        } catch (error) {
            
        }
   
}

    return <div id="home-page-container">
        <h1>Welcome to Get A Guide</h1>
        <div id="home-page-cards">

        {placesData.map((e)=>{        
            
            return <HomeCard key={e.id} name={e.name} image={e.image} detailPage={`./${e.xid}`} xid={e.xid}  />
        })}
        </div>
    </div>
}