import "./ClosedAuctions.css";
import { useEffect, useState } from "react";
import { getAuctions } from "../assets/Functions/FetchFunctions.mjs";
import AuctionCard from "../components/GuideSection/AuctionCard";
import Spinner from "../components/Spinner";
export default function ClosedAuctions() {
    const [auctions ,setAcutions]=useState(undefined);
    const [filAuctions ,setFilAcutions]=useState(undefined);
    const [isLoading, setIsLoading]=useState(false);
    const onlineUser=JSON.parse(localStorage.getItem('onlineUser'));

    useEffect(() => {
        getDataAuc();
      }, []);

      useEffect(()=>{
        if(auctions!=undefined){
            console.log(auctions);
            const filtered=auctions.filter(e=>{
                if(e.username===onlineUser.firstName && e.AuctionIsOpen===true){
                    return e;
                }
            })
            setFilAcutions(filtered);
        }
      },[auctions])

    async function getDataAuc() {
        setIsLoading(true);
        const data = await getAuctions();
        setAcutions(data);
        setIsLoading(false);
      }
    
      function closeClickHandler(id) {
        console.log("close id:", id);
        setAucToClose(id);
      }
    // return <div id='closed-auctions-page'><h1>closed auctions</h1></div>
  return (
    <div id='closed-auctions-page'>
      <div id="closed-auctions">
        <div id="closed-auctions-display">
          {!isLoading &&
            filAuctions &&
            filAuctions.map((e) => {
              if (e.AuctionIsOpen === true) {
                return (
                  <AuctionCard
                    key={e.id}
                    place={e.place}
                    language={e.language}
                    user={e.username}
                    bids={e.bids.length}
                    userType={onlineUser.role}
                    aucId={e.id}
                    closeClickHandler={closeClickHandler}
                    closed={e.AuctionIsOpen}
                    guide={e.GuideWon}
                  />
                );
              }
            })}
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}
