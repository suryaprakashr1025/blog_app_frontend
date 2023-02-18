import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./Viewblog.css"
import { Config } from './Config'
import { FcRating } from 'react-icons/fc'
import { ThreeDots } from 'react-loader-spinner'
import { UserContext } from './Usercontext'

function Viewblog() {

    const view = useContext(UserContext)
    const navigate = useNavigate()
    const { blogid } = useParams()

    const [read, setRead] = useState([])
    const [loading, setLoading] = useState(false)

    const viewmore = async () => {
        try {
            setLoading(true)
            const readdata = await axios.get(`${Config.api}/oneblog/${blogid}`)
            console.log(readdata.data)
            setRead(readdata.data)
            setLoading(false)
        } catch (error) {
            alert("Blog read error")
        }
    }

    useEffect(() => {
        viewmore()
    }, [])

   

    const deleteblog = async () => {
        try {
            const blogdelete = await axios.delete(`${Config.api}/deleteblog/${blogid}`)
            navigate("/bloggerdashboard")
        } catch (error) {
            alert("Delete blog error")
        }
    }

    const back = () => {
        navigate("/bloggerdashboard")
    }
    return (
        <>
            {
                loading ? <div style={{ height: "100vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}><ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="black"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /> </div> :


                    <div className='container-fluid'>


                        <div className='row rdblog'>
                            {
                                read.map(rd => {
                                    return (
                                        <nav class="navbar navbar-expand-lg bg-dark ">
                                            <div class="container-fluid col-lg-12 text-center readtitle">
                                                <a class="navbar-brand mx-auto" href="#" style={{ color: "white", fontWeight: "bold" }}>{rd.title}</a>
                                            </div>
                                        </nav>
                                    )
                                })
                            }

                        </div>

                        <div className='row mt-3 text-center' >

                            <div className='col-lg-6'>
                                {
                                    read.map(rd => {
                                        return (
                                            <img src={rd.image} alt={rd.title} className="img-fluid mx-auto readimg viewimg" style={{ height: "350px" }} />
                                        )
                                    })
                                }

                            </div>

                            <div className='col-lg-6 readreview  mx-auto text-center' style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <h5 style={{ backgroundColor: "black", color: "white", padding: "10px", fontWeight: "bold" }}>Reviews</h5>

                                {
                                    
                                    read.map(rd => {
                                        return (
                                            rd.reviews.length === 0 ? <div style={{fontWeight:"bold",display:"flex",justifyContent:"center",alignItems:"center"}}>No Reviews</div>:
                                            <label>{rd.reviews.map(review => {
                                                return (
                                                    <div className='reviewscroll'>
                                                        <h6 style={{ color: "BLACK", fontWeight: "bold" }}>Reader Name: <span style={{ color: "#F2AA4CFF" }}>{review.reader_name}</span></h6>
                                                        <h6 style={{ color: "BLACK", fontWeight: "bold" }}>Rating: <span style={{ color: "#F2AA4CFF" }}>{review.rating}<FcRating /></span></h6>
                                                        <h6 style={{ color: "BLACK", fontWeight: "bold" }}>Review: <span style={{ color: "#F2AA4CFF" }}>{review.review}</span></h6>
                                                        <hr />
                                                    </div>

                                                )
                                            })}</label>
                                        )
                                    })
                                }
                            </div>

                            <div className='col-lg-12'>
                                {
                                    read.map(rd => {
                                        return (
                                            <div className='col-lg-12 description my-4 ' >
                                                <h3 style={{ fontWeight: "bold" }}>Description</h3>
                                                <p>{rd.description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>



                        <div className='col-lg-12 text-center mb-5 '>
                            <input type="button" value="Back" className='btn btn-outline-dark backbtn mx-3' onClick={back} />
                            <Link to={`/createeditblog/${blogid}`} type="button" value="Edit" className='btn btn-outline-dark backbtn mx-3' >Edit</Link>
                            <input type="button" value="Delete" className='btn btn-outline-dark backbtn' onClick={deleteblog} />
                        </div>

{ view.setEdit(read)}
                    </div >
            }
        </>
    )
}

export default Viewblog