import "./AuctionCard.css";
import { useRef } from "react";
export default function AuctionCard(props) {

  const bidAmountRef=useRef(null);

    if(props.userType==='user'){
        return  <div id="auc-container">
        <h5>To: {props.place}</h5>
        <p>lang: {props.language}</p>
        <p>Opened by: {props.user}</p>
        <p>#Bid: {props.bids}</p>
        <p>Auction Id: {props.aucId}</p>
        <button style={{fontSize:'10px'}} onClick={()=>{props.closeClickHandler(props.aucId)}}>Close Auction</button>
      </div>
    }

  return (
    <div id="auc-container">
      <h5>To: {props.place}</h5>
      <p>lang: {props.language}</p>
      <p>Opened by: {props.user}</p>
      <p>#Bid: {props.bids}</p>
      <p>Auction Id: {props.aucId}</p>
      <div id="bid-control">
        <input
          type="number"
          name=""
          id="bid-input"
          placeholder="Your bid"
          ref={bidAmountRef}
          required
        />
        <button onClick={()=>{props.bidClickHandler(bidAmountRef.current.value, props.aucId )}}>Bid</button>
      </div>
    </div>
  );
}
