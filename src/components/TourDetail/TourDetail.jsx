import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./TourDetail.css";

export default function TourDetail() {

  const [place, setPlace] = useState(undefined);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoadind] = useState(false);
  const params = useParams();

  const location = useLocation();
  const state = location.state;
  console.log("state---",state);

  const apiK = "5ae2e3f221c38a28845f05b61634580f311958ac6a07a129cd0f14cd";
  const url = `https://api.opentripmap.com/0.1/en/places/xid/${params.xid}?apikey=${apiK}`;
  console.log("params.xid", params.xid);
  useEffect(() => {
    getTour();
    
  }, []);
  useEffect(() => {
    console.log("place", place);
   
  },[place])

  async function getTour() {
    setIsLoadind(true);
    try {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            console.log("data", data);
            setPlace(data);
           
            setIsLoadind(false);
          }
        });
    } catch (error) {
      console.log("couldnt fetch");
    }
  }

  function getImage(){
    debugger
    return place.preview.source;
  }

  return (
    <div id="detail-container">
     
      <div id="row-page">
        {isLoading && (
          <div id="spinner">
            {" "}
            <div className="lds-grid">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>{" "}
          </div>
        )}
        {place && 
        <>
         <h2>{place.name}</h2>
        <img src={getImage()} alt="" id="place-image" />
        <div id="info">
          <p id="address-p"><b>Address:</b> {place.address.suburb}</p>
          <p>
            <b>About {place.name}: </b>
            {place.wikipedia_extracts.text}
          </p>
          <p>
            <b>Sources: </b>
            {place.sources.geometry}
          </p>
        </div>
        <div id="control-section"></div>
        </>}
      </div>
    </div>
  );
}
