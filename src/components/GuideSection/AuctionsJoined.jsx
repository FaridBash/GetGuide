
import "./AuctionsJoined.css"

export default function AuctionsJoined(props){


    return <div id="joined-container">
        <p><b>Place:</b> {props.place}</p>
        <p><b>Opened by:</b> {props.user}</p>
        <p><b>Bid amount:</b> {props.bid}</p>
    </div>
}