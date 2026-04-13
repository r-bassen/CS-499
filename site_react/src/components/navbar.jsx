// Code modified from https://mui.com/material-ui/react-tabs/
// import tools
import { NavLink } from "react-router-dom";

// navigation bar 
export default function Navbar() {
    return (
        // display active navigation links
        // if user is logged in, then load the survey results page
        // otherwise, require login
        // reference: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
        <nav className="navbar">
            <NavLink to="/" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"}>Home</NavLink>

            <NavLink to="/chapter-updates" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"}>Chapter News</NavLink>

            <NavLink to="/contract" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"}>Union Contract</NavLink>

            {<NavLink to="/survey" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"}>Survey</NavLink>}
        </nav>
    );
}


