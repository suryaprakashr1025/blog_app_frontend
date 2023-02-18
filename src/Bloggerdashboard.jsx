import React, { useEffect } from 'react'
import "./Bloggerdashboard.css"
import { RotatingSquare } from 'react-loader-spinner'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Config } from './Config'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

function Bloggerdashboard() {
    const navigate = useNavigate()
    const [collapse, setCollapse] = useState(true)
    const [oneblogger, setOneblogger] = useState([])
    const [loading, setLoading] = useState(false)
    const bloggerdata = async () => {
        try {
            setLoading(true)
            const getdata = await axios.get(`${Config.api}/onebloggerblog/${localStorage.getItem("name")}`)
            setOneblogger(getdata.data)
            setLoading(false)
        } catch (error) {
            alert("Bloggerdata error")
        }
    }
    console.log(oneblogger.length)
    useEffect(() => {
        bloggerdata()
    })


    const handleClick = () => {
        setCollapse(false)
    }

    const handleclose = () => {
        setCollapse(true)
    }

    const logout = () => {
        navigate("/")
        localStorage.removeItem("name")
    }

    return (
        <div>

            <nav class="navbar navbar-expand-lg bg-dark blog ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" style={{ color: "white", fontWeight: "bold" }}>Blog App</a>
                    {
                        collapse ? <button class="navbar-toggler" type="button" style={{ color: "white" }} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
                            <span class="navbar-toggler-icon" style={{ color: "white" }}><GiHamburgerMenu /></span>
                        </button> :
                            <button class="navbar-toggler close" style={{ color: "white" }} type="button" onClick={handleclose}>
                                <span><FaTimes /></span>
                            </button>
                    }

                    <div class={`${collapse ? "collapse" : ""} navbar-collapse blognavcoll`} id="navbarNavDropdown" >
                        <ul class="navbar-nav">

                            <li class="nav-item dropdown">
                                <Link to="/createeditblog/empty" class="nav-link " href="#" style={{ color: "white" }} onClick={handleclose} >
                                    Create Blog
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link localname" href="#" style={{ color: "white" }} >
                                    {localStorage.getItem("name")}
                                </a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link " href="#" style={{ color: "white" }} onClick={logout} >
                                    Logout
                                </a>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                <label className="m-5 title blotitle" >The content you create should be useful to the reader</label>
            </div>

            {


                oneblogger.length === 0 ?
                    <div style={{
                        height: "30vh",
                        color: "orange",
                        fontSize: "30px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>No Blogs</div>
                    :

                    <div className='container text-center '>
                        <div className='row ' style={{ display: "flex", justifyContent: "center" }}>
                            {

                               
                                    oneblogger.map(blog => {
                                        return (
                                            <div className='col-lg-3 m-3 blogcard1' style={{ padding: "10px 25px", color: "black", backgroundColor: "white", boxShadow: "5px 5px 10px rgba(0,0,0,0.5)", borderRadius: "25px" }}>
                                                <div className='row'>

                                                    <div className='col-lg-12'>
                                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{blog.title}</h5>
                                                        <hr />
                                                    </div>

                                                    <div className='col-lg-6 mb-2 blogcard'>
                                                        <img src={blog.image} class="card-img-top " alt="..." style={{ width: "120px", height: "100px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} />
                                                    </div>

                                                    <div className='col-lg-6 mb-2'>
                                                        <p style={{ color: "orange", fontWeight: "bold" }}>{blog.description.slice(0, 49)}</p>
                                                    </div>
                                                    <hr />
                                                    <div className='col-lg-12'>
                                                        <Link to={`/viewblog/${blog._id}`} className='btn btn-outline-dark ' style={{ fontWeight: "bold" }}>View More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })
                            }
                        </div>
                    </div>

            }

        </div>
    )
}

export default Bloggerdashboard