
import "./AuctionsJoined.css"

export default function AuctionsJoined(props){


    return <div id="joined-container" style={{background:props.color}}>
        <p><b>Place:</b> {props.place}</p>
        <p><b>Opened by:</b> {props.user}</p>
        <p><b>Bid amount:</b> {props.bid}</p>
        <p>Auction Id: {props.aucId}</p>
    </div>
}