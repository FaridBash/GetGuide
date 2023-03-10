import AuctionsJoined from "../GuideSection/AuctionsJoined";
import "./JoinedAuctions.css";
import { getAuctions } from "../../assets/Functions/FetchFunctions.mjs";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Chart from "../Chart/Chart";

export default function JoinedAuctions() {
  const [onlineUser, setOnlineUser] = useState(
    JSON.parse(localStorage.getItem("onlineUser"))
  );
  const [isLoading, setIsLoading]=useState(false);
  const [auctions, setAcutions] = useState(undefined);
  const [auctionsByGuide, setAcutionsByGuide] = useState(undefined);
  const [numOfAuctions, setNumOfAuctions]=useState();
  const [numWonAuctions, setNumWonAuctions]=useState();
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
      setNumOfAuctions(auctions.length)
    }
  }, [auctions]);

  async function getDataAuc() {
    setIsLoading(true);
    const data = await getAuctions();
    setAcutions(data);
    setIsLoading(false);
  }



  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [numOfAuctions, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  // return <div><h1>JoinedAuctions</h1></div>
  return (
    <div id="joined-auctions-page">
      <div id="guide-lists">
        <div id="joined-auctions">
          <p>Joined Auctions:</p>
          <div class="table">

          <div class="data-table">
            {!isLoading && auctionsByGuide &&
              auctionsByGuide.map((e) => {
                let mycolor = "green";
                const myBid = e.bids.find((i) => {
                  if (i.name === onlineUser.firstName) return i.bid;
                });
                if (e.AuctionIsOpen === true) {
                  mycolor='red'
                }
                  return (
                    <AuctionsJoined place={e.place} user={e.username} bid={myBid.bid} color={mycolor} aucId={e.id}/>
                  );
              })}
              {isLoading && <Spinner/>}
          </div>
          </div>
        </div>
        <div><Chart data={data} /></div>
      </div>
      
      
    </div>
  );
}
