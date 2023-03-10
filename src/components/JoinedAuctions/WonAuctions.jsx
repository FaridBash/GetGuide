import './WonAuctions.css'
import { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { getAuctions } from '../../assets/Functions/FetchFunctions.mjs';
import AuctionsJoined from '../GuideSection/AuctionsJoined';
export default function WonAuctions(){

    const [onlineUser, setOnlineUser] = useState(
        JSON.parse(localStorage.getItem("onlineUser"))
      );
      const [isLoading, setIsLoading]=useState(false);
      const [auctions, setAcutions] = useState(undefined);
      const [auctionsByGuide, setAcutionsByGuide] = useState(undefined);
    
      useEffect(() => {
        getDataAuc();
      }, []);
    
      useEffect(() => {
        if (auctions != undefined) {
          console.log("exported data:", auctions);
          const filteredAuc = auctions.filter((obj) => {
            for (let i = 0; i < obj.bids.length; i++) {
              if (obj.bids[i].name === onlineUser.firstName) {
                return true;
              }
            }
            return false;
          });
          setAcutionsByGuide(filteredAuc);
          console.log("filteredAuc", auctionsByGuide);
        }
      }, [auctions]);
    
      async function getDataAuc() {
        setIsLoading(true);
        const data = await getAuctions();
        setAcutions(data);
        setIsLoading(false);
      }
    
    return <div id="won-auctions-guide">
    <div class="won-table">
    <div className="won-data-table">
      { !isLoading && auctionsByGuide &&
        auctionsByGuide.map((e) => {
          const myBid = e.bids.find((i) => {
            if (i.name === onlineUser.firstName) return i.bid;
          });
          console.log("myBid", myBid.bid);
          if (
            e.AuctionIsOpen === true &&
            e.GuideWon === onlineUser.firstName
          ) {
            return (
              <AuctionsJoined
                place={e.place}
                user={e.username}
                bid={myBid.bid}
                aucId={e.id}
                color="grey"
              />
            );
          }
        })}
        {isLoading && <Spinner/>}
    </div>
    </div>
  </div>
}