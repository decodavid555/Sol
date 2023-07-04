import React, {  useState  } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
// import "../style/Home.css";
import { checkUserLoggedIn } from "./Login";
// import Navbar from "./Navbar";


const Home = ({token, setToken,  user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("");
  
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <nav style={{display: "block"}}>

 <header className="header">
     <br/>
      {checkUserLoggedIn() ? user?.isAdmin ? (<Admin setSelectedProduct={setSelectedProduct}/>) :
        (<div className="header">
           <input
      className="search"
      placeholder="Search"
      value={searchInput}
      type="text"
      onChange={(e) => setSearchInput(e.target.value)}
  ></input>
        <h1>Hello, {user?.username}!</h1>
       </div>) : (
       <div className="header">
         <input
      className="search"
      placeholder="Search"
      value={searchInput}
      type="text"
      onChange={(e) => setSearchInput(e.target.value)}
  ></input>
      <h1>Hello, Stranger!</h1>
      </div>)}
      </header>
        </nav>
    </div>
  ); 
};

export default Home; 