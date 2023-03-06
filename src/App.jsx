import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './components/HomeCards/HomePage'
import Header from './components/Header/Header'
import GuideDash from './components/GuideSection/GuideDash'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TourDetail from './components/TourDetail/TourDetail'
import SignIn from './components/SignIn/SignIn'


const route = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/:xid",
        element: <TourDetail/>,
      },
      {
        path: "/guidedash",
        element: <GuideDash/>,
      },
      {
        path: "/signin",
        element: <SignIn/>,
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
