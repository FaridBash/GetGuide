import "./AuctionCard.css";

export default function AuctionCard(props) {




    if(props.userType==='user'){

        return  <div id="auc-container">
        <h5>To: {props.place}</h5>
        <p>lang: {props.language}</p>
        <p>Opened by: {props.user}</p>
        <p>#Bid: {props.bids}</p>
       
      </div>
    }

  return (
    <div id="auc-container">
      <h5>To: {props.place}</h5>
      <p>lang: {props.language}</p>
      <p>Opened by: {props.user}</p>
      <p>#Bid: {props.bids}</p>
      <div id="bid-control">
        <input
          type="number"
          name=""
          id="bid-input"
          placeholder="Your bid"
          required
        />
        <button>Bid</button>
      </div>
    </div>
  );
}
