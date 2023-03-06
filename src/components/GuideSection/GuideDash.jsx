import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import AuctionCard from "./AuctionCard";
import "./GuideDash.css";

export default function GuideDash() {
  const [isLoading, setIsLoadind] = useState(false);
  const [auctions, setAcutions] = useState([]);
  const [filteredAuctions, setFilteredAcutions] = useState();
  const [auctionBoxId, setAuctionBoxId] = useState(undefined);
  const [bid, setBid] = useState(undefined);
  const [bidderObj, setBidderObj]=useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('onlineUser')).role);
  const [onlineUser, setOnlineUser]=useState(JSON.parse(localStorage.getItem('onlineUser'))??null);
  const [lang, setLang]=useState(JSON.parse(localStorage.getItem('onlineUser')).speakLanguages);
  const [aucByLang, setAucByLang]=useState([]);
  const url = `https://640457a280d9c5c7bac5adca.mockapi.io/getguide/auctions`;

  useEffect(() => {
    getAuctions();
  }, []);

  useEffect(() => {
    if (user === "user" && auctions) {
      const auctionsByUser = auctions.filter((e) => {
        return e.username === JSON.parse(localStorage.getItem('onlineUser')).firstName ? e : console.log("object");
      });
      console.log("filtered auctu=ions", auctionsByUser);

      setFilteredAcutions(auctionsByUser);
      console.log("Auct by user", auctions);
    }

    const auctionByLan=auctions.filter((e)=>{
      if(JSON.parse(localStorage.getItem('onlineUser')).speakLanguages.includes(e.language)){
        return e;
      }
    });
    setAucByLang(auctionByLan);
  }, [auctions]);

  useEffect(() => {
    console.log("My Bid is", bid);
    let newObj={};
    newObj.name=onlineUser.firstName;
    newObj.bid=bid;
    setBidderObj(newObj);
    console.log('bidderObj',bidderObj.bid);
    updateHandler(auctionBoxId, bid);

  }, [bid]);

  function getAuctions() {
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
    } catch (error) {
      console.log("Couldn't fetch");
    }
  }

  function bidClickHandler(d, id) {
    setBid(d);
    setAuctionBoxId(id);
    console.log("clicccck", id);
  }

  async function updateHandler(itemId, newbid) {
    let newObj={}
    const myAuc = auctions.filter((e) => {
      return e.id === itemId ? e : undefined;
    });
    // if(myAuc!=undefined){

    //   newObj=myAuc.bids.forEach(element => {
    //     if(element.name===onlineUser.firstName){return element}
    //   });
    //   if(!newObj){newObj.name=onlineUser.name; newObj.bid=newbid}
    //   console.log('newObj',newObj);
    // }
    console.log("myAuc", myAuc);
    try {
      fetch(`${url}/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          bids: [...myAuc[0].bids, bidderObj],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    } catch (error) {
      
    }
  }


  async function updateUserHandler(userId, lang){
    // let user=JSON.parse(localStorage.getItem('onlineUser'));
    // const role=role;
    // user={...user, role}
    try {
        fetch(`https://640457a280d9c5c7bac5adca.mockapi.io/getguide/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
           
          speakLanguages:lang,
           
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
    .then(res => res.json())
    .then(data => console.log("res",data))
    // console.log("EDIT obj:", data);
    } catch (error) {
        
    }
    }

  if (user === "user") {
    return (
      <div id="user-page">
        <h4>Hello {onlineUser.firstName}</h4>
        <div id="user-dash">
          {!isLoading &&
            filteredAuctions &&
            filteredAuctions.map((e) => {
              return (
                <AuctionCard
                  key={e.id}
                  place={e.place}
                  language={e.language}
                  user={e.username}
                  bids={e.bids.length}
                  userType={user}
                />
              );
            })}
          {isLoading && <Spinner />}
        </div>
      </div>
    );
  } else if (user === "guide") {
    return (
      <div id="guide-dash-container">
        <h4>Hello {onlineUser.firstName}</h4>
        <div id="page-container">
          <h5>Open Bids:</h5>
          <div id="auctions-sec">
            {!isLoading &&
              auctions &&
              aucByLang.map((e) => {
                return (
                  <AuctionCard
                    key={e.id}
                    place={e.place}
                    language={e.language}
                    user={e.username}
                    bids={e.bids.length}
                    userType={user}
                    bidClickHandler={bidClickHandler}
                    aucId={e.id}
                  />
                );
              })}
            {isLoading && <Spinner />}
          </div>
        </div>
      </div>
    );
  } else if (user === "admin") {
    return (
      <div>
        <h1>Welcome admin</h1>
        <button onClick={()=>{updateUserHandler(3, ["French"])}}>edit</button>
      </div>
    );
  }
}
