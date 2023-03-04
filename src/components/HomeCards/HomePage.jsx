import { useEffect, useRef, useState } from "react";
import HomeCard from "./HomeCards";
import "./HomePage.css";

export default function HomePage() {
  const [isLoading, setIsLoadind] = useState(false);
  const [placesData, setPlacesData] = useState([]);
  const [lon ,setLon]=useState();
  const [lat ,setLat]=useState();
  const [citySearch, setCitySearch]=useState();
  // const [placeImages, setPlacesImage] = useState([]);
  
  const state = location.state;
  const apiK = "5ae2e3f221c38a28845f05b61634580f311958ac6a07a129cd0f14cd";
 
    const searchCityRef=useRef(null);


useEffect(() => {
    console.log(citySearch);
    if(citySearch){
        fetchCityData();
        if(lon && lat){
            fetchData();
        }
    }

  }, [citySearch, lat, lon]);

  async function fetchCityData() {
    setIsLoadind(true);
    try {
      fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${citySearch}&country=il&apikey=${apiK}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("city data",data);
          setLat(data.lat);
          console.log(lat);
          setLon(data.lon);
          console.log(lon);
          setIsLoadind(false);
        });
    } catch (error) {
      console.log("Couldn't fetch");
    }
  }
  

  async function fetchData() {
    const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&src_geom=wikidata&src_attr=wikidata&rate=3&format=json&limit=50&apikey=${apiK}`;
    try {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPlacesData(data);
         
        });
    } catch (error) {
      console.log("Couldn't fetch");
    }
  }


  return (
    <div id="home-page-container">
      <h1>Welcome to Get A Guide</h1>
        <form id="search-form">
        <input type="text" ref={searchCityRef} />
        <button onClick={(e)=>{ e.preventDefault(); setCitySearch(searchCityRef.current.value)}}>Search</button>
        </form>
      <div id="home-page-cards">
        { !isLoading && placesData.map((e) => {
          return (
            <HomeCard
              key={e.id}
              name={e.name}
              kinds={e.kinds.split(',')[0]}
              detailPage={`./${e.xid}`}
              xid={e.xid}
             
            />
          );
        })}
        {isLoading && <div id='spinner'> <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>}

      </div>
    </div>
  );
}
