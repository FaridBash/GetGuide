import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './components/HomeCards/HomePage'
import Header from './components/Header/Header'
import GuideDash from './components/GuideSection/GuideDash'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TourDetail from './components/TourDetail/TourDetail'
import SignIn from './components/SignIn/SignIn'
import AuctionsJoined from './components/GuideSection/AuctionsJoined'
import JoinedAuctions from './components/JoinedAuctions/JoinedAuctions'
import DasboardNav from './components/GuideSection/DashboardNav'
import ClosedAuctions from './ClosedAuctions/ClosedAuctions'
import WonAuctions from './components/JoinedAuctions/WonAuctions'

const route = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <SignIn/>,
      },
      {
        path: "/home/:xid",
        element: <TourDetail/>,
      },
      {
        path: "/guidedash",
        element: <DasboardNav/>,
        children: [
          {
            path: "/guidedash/openauctions",
            element: <GuideDash/>,
          },
          {
            path: "/guidedash/openauctions/JoinedAuctions",
            element: <JoinedAuctions/>
          },
          {
            path: "/guidedash/openauctions/Won",
            element: <WonAuctions/>
          },
          {
            path:"/guidedash/closedauctions",
            element:<ClosedAuctions/>
          }
          
        ],
      },
      {
        path: "/home",
        element: <HomePage/>,
      },
     
     
    ],
  },
 
]);


function App() {
  

  return (
    <div className="App">
       <RouterProvider router={route}/>
    </div>
  )
}

export default App
