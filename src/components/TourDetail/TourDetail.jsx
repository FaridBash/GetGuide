import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TourDetail.css";

export default function TourDetail() {

    const params=useParams();
    const apiK='5ae2e3f221c38a28845f05b61634580f311958ac6a07a129cd0f14cd'
    const url=`https://api.opentripmap.com/0.1/en/places/xid/${params.xid}?apikey=${apiK}`
    console.log("params.xid",params.xid);
    useEffect(()=>{
        getTour();
    },[])


    function getTour(){
    
        try {
            
            fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data){
                    console.log(data.wikipedia_extracts.text);
                }
                
            });
        } catch (error) {
            
        }
   
}

  return <div id="detail-container">
    <h1>Product Details</h1>
    <p></p>
  </div>;
}
