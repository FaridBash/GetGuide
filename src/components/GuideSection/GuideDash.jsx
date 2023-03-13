import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import AuctionCard from "./AuctionCard";
import AuctionsJoined from "./AuctionsJoined";
import DasboardNav from "./DashboardNav";
import { useNavigate } from "react-router-dom";
import "./GuideDash.css";

export default function GuideDash() {

  const nav=useNavigate();
  const [isLoading, setIsLoadind] = useState(false);
  const [auctions, setAcutions] = useState([]);
  const [filteredAuctions, setFilteredAcutions] = useState();
  const [auctionBoxId, setAuctionBoxId] = useState(undefined);
  const [bid, setBid] = useState(undefined);
  const [bidderObj, setBidderObj] = useState({});
  const [joinedAucByGuide, setJoinedAucByGuide] = useState();
  const [aucToClose, setAucToClose] = useState(undefined);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("onlineUser")).role
  );
  const [onlineUser, setOnlineUser] = useState(
    JSON.parse(localStorage.getItem("onlineUser")) ?? null
  );
  const [lang, setLang] = useState(
    JSON.parse(localStorage.getItem("onlineUser")).speakLanguages
  );
  const [aucByLang, setAucByLang] = useState([]);
  const url = `https://640457a280d9c5c7bac5adca.mockapi.io/getguide/auctions`;

  useEffect(() => {
    
    getAuctions();
  }, []);

  useEffect(() => {
    if (aucToClose != undefined) {
      updateCloseHandler(aucToClose);
      console.log("close id", aucToClose);
      updateWinnerHandler(aucToClose);
    }
  }, [aucToClose]);

  useEffect(() => {
    if (user === "user" && auctions) {
      const auctionsByUser = auctions.filter((e) => {
        return e.username ===
          JSON.parse(localStorage.getItem("onlineUser")).firstName
          ? e
          : console.log("object");
      });
      console.log("filtered auctu=ions", auctionsByUser);

      setFilteredAcutions(auctionsByUser);
      console.log("Auct by user", auctions);
    }

    const auctionByLan = auctions.filter((e) => {
      if (
        JSON.parse(localStorage.getItem("onlineUser")).speakLanguages.includes(
          e.language
        )
      ) {
        return e;
      }
    });
    setAucByLang(auctionByLan);

    console.log("auctions", aucByLang);
    const auctionsByGuide = aucByLang.filter((obj) => {
      for (let i = 0; i < obj.bids.length; i++) {
        if (obj.bids[i].name === onlineUser.firstName) {
          return true;
        }
      }
      return false;
    });

    setJoinedAucByGuide(auctionsByGuide);

    console.log("auctionsByGuide", auctionsByGuide);
  }, [auctions, bid]);

  useEffect(() => {
    console.log("My Bid is", bid);
    let newObj = {};
    if (bid != "" && bid != undefined) {
      newObj.name = onlineUser.firstName;
      newObj.bid = bid;
      setBidderObj(newObj);
    }

  }, [bid, joinedAucByGuide]);

  useEffect(() => {
    console.log("bidderObj", bidderObj);
    updateHandler(auctionBoxId, bidderObj);
  }, [bidderObj]);

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
    setTimeout(() => {
    nav('/guideDash/openauctions/JoinedAuctions');  
    }, 600);
    console.log("clicccck", id);
  }

  function closeClickHandler(id) {
    console.log("close id:", id);
    setAucToClose(id);
    // setTimeout(() => {
    //   nav('/guideDash/closedauctions')
    // }, 1000);
  }

  async function updateHandler(itemId, biObj) {
    const myAuc = auctions.find((e) => {
      if (e.id === itemId) {
        return e;
      }
    });

    try {
      fetch(`${url}/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          bids: [biObj, ...myAuc.bids],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    } catch (error) {}
  }
  async function updateCloseHandler(itemId) {
    const myAuc2 = auctions.find((e) => {
      if (e.id === itemId) {
        return e;
      }
    });
    console.log("My CLosed Auction", myAuc2.bids);
    let min = myAuc2.bids[0].bid;
    let gName = myAuc2.bids[0].name;
    if (myAuc2.bids != undefined) {
      for (let i = 0; i < myAuc2.bids.length; i++) {
        const element = myAuc2.bids[i];
        if (min > element.bid) {
          min = element.bid;
          gName = element.name;
        }
      }
    }
    try {
      fetch(`${url}/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          AuctionIsOpen: true,
          GuideWon: gName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    } catch (error) {}
  }
  async function updateWinnerHandler(itemId) {
    const myAuc2 = auctions.find((e) => {
      if (e.id === itemId) {
        return e;
      }
    });
    console.log("My CLosed Auction", myAuc2.bids);
    let min = myAuc2.bids[0].bid;
    let gName = myAuc2.bids[0].name;
    if (myAuc2.bids != undefined) {
      for (let i = 0; i < myAuc2.bids.length; i++) {
        const element = myAuc2.bids[i];
        if (min > element.bid) {
          min = element.bid;
          gName = element.name;
        }
      }
    }
    try {
      fetch(`${url}/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          GuideWon: gName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) =>   nav('/guideDash/closedauctions'));
    } catch (error) {}
  }

  async function updateUserHandler(userId, lang) {
    // let user=JSON.parse(localStorage.getItem('onlineUser'));
    // const role=role;
    // user={...user, role}
    try {
      fetch(
        `https://640457a280d9c5c7bac5adca.mockapi.io/getguide/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            speakLanguages: lang,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log("res", data));
    } catch (error) {}
  }

  if (user === "user") {
    return (
      <div id="user-page">
        
          <div id="open-auctions-user">
            <div id="open-auctions-display">
              {!isLoading &&
                filteredAuctions &&
                filteredAuctions.map((e) => {
                  if (e.AuctionIsOpen === false) {
                    return (
                      <AuctionCard
                        key={e.id}
                        place={e.place}
                        language={e.language}
                        user={e.username}
                        bids={e.bids.length}
                        userType={user}
                        aucId={e.id}
                        closeClickHandler={closeClickHandler}
                      />
                    );
                  }
                })}
              {isLoading && <Spinner />}
            </div>
          </div>
        
      </div>
    );
  } else if (user === "guide") {
    return (
      <div id="guide-dash-container">
        <div id="page-container">
          <div id="auctions-sec">
            {!isLoading &&
              auctions &&
              aucByLang.map((e) => {
                if (e.AuctionIsOpen === false) {
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
                }
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
        <button
          onClick={() => {
            updateUserHandler(3, ["French"]);
          }}
        >
          edit
        </button>
      </div>
    );
  }
}
