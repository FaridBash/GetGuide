import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './components/HomeCards/HomePage'
import Header from './components/Header/Header'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TourDetail from './components/TourDetail/TourDetail'


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
