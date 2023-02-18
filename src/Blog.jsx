import axios from 'axios'
import React, { useEffect } from 'react'
import { Config } from './Config'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTimes } from 'react-icons/fa';
import "./Blog.css"
import { RotatingSquare } from 'react-loader-spinner'
import { GiHamburgerMenu } from 'react-icons/gi';
function Blog() {
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const getdata = async () => {
        try {
            setLoading(true)
            const getblog = await axios.get(`${Config.api}/readblog`)
            console.log(getblog.data)
            setBlog(getblog.data)
            setLoading(false)
        } catch (error) {
            alert("Blog error")
        }
    }


    console.log(blog)

    useEffect(() => {
        getdata()
    }, [])

    const [collapse, setCollapse] = useState(true)


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
        <>

            {
                loading ?
                    <div style={{ height: "100vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <RotatingSquare
                            height="100"
                            width="100"
                            color="black"
                            ariaLabel="rotating-square-loading"
                            strokeWidth="4"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> </div> :

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
                            <label className="m-5 title" >Read the Blogs !!</label>
                        </div>


                        <div className='container'>
                            <div className='row'>
                                {
                                    blog.map(item => {
                                        return (
                                            <div className='col-lg-4 bloglist'>
                                                <div class="card">
                                                    <img src={item.image} class="card-img-top mx-auto" alt="..." />
                                                    <div class="card-body text-center">
                                                        <h5 class="card-title " style={{ color: "rgb(226, 82, 38)" }}>{item.title}</h5>
                                                        <h6 class="card-title">Publisher Name: {item.publisher_name}</h6>
                                                        <h6 class="card-title">Published Date:{item.publish_date}</h6>
                                                        <Link to={`/readblog/${item._id}`} href="#" class="btn btn-outline-dark read">Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Blog