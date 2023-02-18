import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom"
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import "./Welcomedashboard.css"
function Welcomdashboard() {

    const [collapse, setCollapse] = useState(true)


    const handleClick = () => {
        setCollapse(false)
    }
    const handleclose = () => {
        setCollapse(true)
    }
    return (
        <div className="dashboard" style={{ fontFamily: "Poppins, sans-serif" }}>

            <nav class="navbar navbar-expand-lg bg-light user ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" style={{ color: "white", fontWeight: "bold" }}>Blog App</a>
                    {
                        collapse ? <button class="navbar-toggler" type="button" style={{ color: "white" }} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
                            <span class="navbar-toggler-icon" style={{ color: "white" }}><GiHamburgerMenu/></span>
                        </button> :
                            <button class="navbar-toggler close" style={{ color: "white" }} type="button" onClick={handleclose}>
                                <span><FaTimes /></span>
                            </button>
                    }

                    <div class={`${collapse ? "collapse" : ""} navbar-collapse navcoll`} id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <Link to="/" class="nav-link " href="#"  onClick={handleclose}>
                                    Home
                                </Link>

                            </li>

                            <li class="nav-item" onClick={handleclose}>
                                <Link to="/login" class="nav-link " href="#" >
                                    Login
                                </Link>
                            </li>

                            <li class="nav-item " onClick={handleclose}>
                                <Link to="/register" class="nav-link " href="#" >
                                    Register
                                </Link>
                                {/* <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   Register
                                </a> */}
                                {/* <ul class="dropdown-menu">
                                    <li><Link to="/register" class="dropdown-item" >Register</Link></li>
                                    <li><Link to="/login" class="dropdown-item" >Login</Link></li>
                                    <li><Link to="/changepassword" class="dropdown-item" >Change Password</Link></li>
                                    <li><Link to="/forgetpassword" class="dropdown-item" >Forget Password</Link></li>
                                </ul> */}
                            </li>

                            <li class="nav-item ">
                                <Link to="/changepassword" class="nav-link " href="#" onClick={handleclose}>
                                Changepassword
                                </Link>
                            </li>
                            <li class="nav-item ">
                                <Link to="/forgetpassword" class="nav-link " href="#" onClick={handleclose}>
                                Forgetpassword
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>

    )
}

export default Welcomdashboard