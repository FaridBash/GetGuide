

const url = `https://640457a280d9c5c7bac5adca.mockapi.io/getguide/auctions`;

export async function getAuctions() {
    
    try {
      const res=await fetch(url);
        const data =await res.json();
        return Promise.resolve(data);
        // console.log(data);
    } catch (error) {
      console.log("Couldn't fetch");
    }
  }