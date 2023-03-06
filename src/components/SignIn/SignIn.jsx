import { useEffect, useRef, useState } from "react"
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import './SignIn.css'



export default function SignIn(){
    const [users, setUsers]=useState(undefined);
    const [onlineUser, setOnlineUser]=useState(JSON.parse(localStorage.getItem("onlineUser"))??null);
    const [isLoading, setIsLoadind]=useState(false);
    const navigate = useNavigate();
    const emailRef=useRef(null)
    const passwordRef=useRef(null)
    const url=`https://640457a280d9c5c7bac5adca.mockapi.io/getguide/users`;
   

    useEffect(()=>{

        if(users!=undefined){
            const onUser=users.find(u=>u.email===emailRef.current.value);
            if(onUser){
              console.log("Onuser");
              if(passwordRef.current.value===onUser.password){
                localStorage.setItem("onlineUser",JSON.stringify(onUser))
                console.log('onlineUser',onUser);
                navigate('/guidedash');
              }
            }
        }


    },[users])

    function handleSubmmit(e){
        e.preventDefault();
        getUser();
       
    }

    async function getUser() {
        setIsLoadind(true);
        try {
          fetch(url)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data) {
                console.log("Users", data);
                setUsers(data);
                setIsLoadind(false);
              }
            });
        } catch (error) {
          console.log("couldnt fetch");
        }
      }

    
    
    return(
        <div id="signup-form-container">
          <img src="src\assets\get-a-guide-high-resolution-logo-white-on-transparent-background.png" alt="" id="logo" />
            <form id="signup-form">
            <h2>Sign In</h2>
                <div id="inputs">
                    <input type="email" ref={emailRef} placeholder="Email" required className="signup-input"/>
                    <input type="password" ref={passwordRef} placeholder="Password" required className="signup-input"/>
                </div>
                <button type="submit"  className="button-21" onClick={handleSubmmit}>Sign In</button>
            <h5>Don't have account? Sign up here</h5>
            </form>
           
        </div>
    )
}