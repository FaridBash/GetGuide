import { useEffect,useState } from "react";
import AuctionCard from "./AuctionCard";
import './GuideDash.css'


export default function GuideDash(){
    const [isLoading, setIsLoadind]=useState(false);
    const [auctions, setAcutions]=useState();
    const [filteredAuctions, setFilteredAcutions]=useState();

    const [user, setUser]=useState('user');
    const url=`https://640457a280d9c5c7bac5adca.mockapi.io/getguide/auctions`;

    useEffect(()=>{
        getAuctions();
       
        
      },[])
      
      useEffect(()=>{
        
        if(user==='user' && auctions){
          const auctionsByUser=auctions.filter((e)=>{return e.username==='Fareed'? e: console.log("object");})
          console.log("filtered auctu=ions", auctionsByUser);
      
            setFilteredAcutions(auctionsByUser);
            console.log("Auct by user", auctions);
          
        }
      
    },[auctions])


    function getAuctions(){
        setIsLoadind(true);
      try {
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setAcutions(data);
            console.log(data);
            setIsLoadind(false);
          });
      } catch (error) {console.log("Couldn't fetch");}
    }


    if(user === 'user'){
      return <div>
        <h1>Hello user</h1>
        {!isLoading && filteredAuctions && filteredAuctions.map((e)=>{
          return <AuctionCard key={e.id} place={e.place} language={e.language} user={e.username} bids={e.bids.length} userType={user}/>
        })
        
        }
        {isLoading && <div id='spinner'> <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>}
        </div>
    }
    else if(user === 'guide' ){

    return <div id="guide-dash-container">
        <h4>Hello Guide</h4>
        <div id="page-container">
        <h5>Open Bids:</h5>
        <div id="auctions-sec">
        {!isLoading && auctions && auctions.map((e)=>{
            return <AuctionCard place={e.place} language={e.language} user={e.username} bids={e.bids.length} userType={user}/>
        })}
        {isLoading && <div id='spinner'> <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>}
        </div>
        </div>
        </div>
    }
    else if(user === 'admin'){
      return <div><h1>Wlcome admin</h1></div>
    }
}