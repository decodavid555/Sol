import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const App = () => {
    //

    return(
        <div className="app-container">
            <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register setUser={setUser} setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
            </Routes>
        </div>
    );
};
export default App;