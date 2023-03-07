import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import AuctionCard from "./AuctionCard";
import AuctionsJoined from "./AuctionsJoined";
import "./GuideDash.css";

export default function GuideDash() {
  const [isLoading, setIsLoadind] = useState(false);
  const [auctions, setAcutions] = useState([]);
  const [filteredAuctions, setFilteredAcutions] = useState();
  const [auctionBoxId, setAuctionBoxId] = useState(undefined);
  const [bid, setBid] = useState(undefined);
  const [bidderObj, setBidderObj] = useState({});
  const [joinedAucByGuide, setJoinedAucByGuide] = useState();
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
  }, [auctions]);

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
    console.log("clicccck", id);
  }

  function closeClickHandler(id) {
    console.log("close id:", id);
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
          bids: [...myAuc.bids, biObj],
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
    try {
      fetch(`${url}/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          AuctionIsOpen: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("res", data));
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
                  aucId={e.id}
                  closeClickHandler={closeClickHandler}
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
                  <AuctionCard key={e.id} place={e.place} language={e.language} user={e.username} bids={e.bids.length} userType={user} bidClickHandler={bidClickHandler} aucId={e.id}
                  />
                );
              })}
            {isLoading && <Spinner />}
          </div>
          <div id="guide-lists">
            <div id="joined-auctions">
              <p>Joined Auctions:</p>
              <div id="data-table">
                {joinedAucByGuide &&
                  joinedAucByGuide.map((e) => {
                    const myBid = e.bids.find((i) => {
                      if (i.name === onlineUser.firstName) return i.bid;
                    });
                    console.log("myBid", myBid.bid);
                    return (
                      <AuctionsJoined place={e.place} user={e.username} bid={myBid.bid}
                      />
                    );
                  })}
              </div>
            </div>
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
