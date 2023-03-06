import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";
import LangSelect from "./LangSelect";
import "./TourDetail.css";

export default function TourDetail() {
  const [place, setPlace] = useState(undefined);
  const [isLoading, setIsLoadind] = useState(false);
  const [option , setOption]=useState('');
  const [auctionObj, setAuctionObj]=useState(undefined);
  
  const params = useParams();

  const apiK = "5ae2e3f221c38a28845f05b61634580f311958ac6a07a129cd0f14cd";
  const url = `https://api.opentripmap.com/0.1/en/places/xid/${params.xid}?apikey=${apiK}`;
  console.log("params.xid", params.xid);
  useEffect(() => {
    getTour();
  }, []);
  useEffect(() => {
    if(auctionObj){
      fetchOpenAuction(auctionObj);
    }
  }, [auctionObj]);

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


  const handleChange=(selectedOption)=>{
    setOption(selectedOption);
    console.log(selectedOption);
};


async function fetchOpenAuction(obj){
        
  const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
  };
  
  try {
      const response = await fetch(`https://640457a280d9c5c7bac5adca.mockapi.io/getguide/auctions`, requestOptions);
      const data = await response.json();
      console.log("fetched data: ", data);
      console.log("FETCHHHHHEEDDDDD");
  } catch (error) {
      
  }
}




  return (
    <div id="detail-container">
      {isLoading && (
        <Spinner/>
      )}
      {place && (
        <>
          <div id="row-page">
            <h2>{place.name}</h2>
            <div id="row">
              <img src={place.preview.source} alt="" id="place-image" />
              <div id="control-section">
                <LangSelect handleChange={handleChange} />
                <button id="auction-btn" onClick={()=>{
                    setAuctionObj({place: place.name, language: option.value, bids:[], username:JSON.parse(localStorage.getItem('onlineUser')).firstName});
                  console.log("option", option.value);}}
                  >Start Auction</button>
              </div>
              <div id="info">
                <p id="address-p">
                  <b>Address:</b> {place.address.suburb}
                </p>
                <p>
                  <b>About {place.name}: </b>
                  {place.wikipedia_extracts.text}
                </p>
                <p>
                  <b>Sources: </b>
                  {place.sources.geometry}
                </p>
              </div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
