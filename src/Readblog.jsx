import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Readblog.css"
import { Config } from './Config'
import { FcRating } from 'react-icons/fc'
import { ThreeDots } from 'react-loader-spinner'

function Readblog() {
    const navigate = useNavigate()
    const { blogid } = useParams()

    const [read, setRead] = useState([])
    const [rating, setRating] = useState("")
    const [reviewlen, setReviewlen] = useState("")
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)

    const readmore = async () => {
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
        readmore(blogid)
    }, [])

    const textreview = () => {
        setTouched(true)
    }
    console.log(rating)

    const submitreview = async () => {
        try {

            const givereview =
                touched && (rating !== "Select rating") && (reviewlen.length > 10 || reviewlen.length < 50) ?
                    await axios.put(`${Config.api}/reviewblog/${blogid}`, {
                        reader_name: `${localStorage.getItem("name")}`,
                        rating: `${rating}`,
                        review: `${reviewlen}`
                    }) : alert("The review should be given according to the conditions.")
            console.log(givereview)
            touched && (rating !== "Select rating") && (reviewlen.length > 10 || reviewlen.length < 50) ? navigate("/blog") : navigate(`/readblog/${blogid}`)
        } catch (error) {
            alert("Submit Review error")
        }
    }

    const back = () => {
        navigate("/blog")
    }
    return (
        <>
            {
                loading ? <div style={{height:"100vh", display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><ThreeDots
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

                            <div className='col-lg-12'>
                                {
                                    read.map(rd => {
                                        return (
                                            <img src={rd.image} alt={rd.title} className="img-fluid mx-auto readimg" />
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

                        <div className='row m-3' >
                            <div className='col-lg-6 givereview  mx-auto ' style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <h5 className='text-center' style={{ backgroundColor: "black", color: "white", padding: "10px", fontWeight: "bold" }}>Review Form</h5>

                                <div className='reviewform'>

                                    <div class="mb-3 ">
                                        <label for="exampleFormControlInput1" class="form-label" style={{ fontWeight: "bold" }}>Rating</label>
                                        <select type="text" class="form-control" id="exampleFormControlInput1" value={rating} onChange={(e) => setRating(e.target.value)} onClick={textreview} >
                                            <option>Select rating</option>
                                            {
                                                [...Array(5)].map((num, index) => {
                                                    return (
                                                        <option>{index + 1}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {
                                            touched && rating === "Select rating" ? <span style={{ color: "red" }}>Please select rating</span> : null
                                        }
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label" style={{ fontWeight: "bold" }}>Review</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={reviewlen} onChange={(e) => setReviewlen(e.target.value)} onClick={textreview}></textarea>
                                        {
                                            touched && (reviewlen.length < 10 || reviewlen.length > 50) ? <span style={{ color: "red" }}>Please enter 10 to 50 characters only</span> : null
                                        }
                                    </div>

                                    <div className='mb-3 text-center'>
                                        <input type="submit" value="Submit" className='btn btn-outline-dark' style={{ fontWeight: "bold" }} onClick={submitreview} />
                                    </div>

                                </div>

                            </div>
                            <div className='col-lg-6 readreview  mx-auto text-center' style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <h5 style={{ backgroundColor: "black", color: "white", padding: "10px", fontWeight: "bold" }}>Reviews</h5>

                                {
                                    read.map(rd => {
                                        return (
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
                            <div className='col-lg-12 text-center mt-5'>
                                <input type="button" value="Back" className='btn btn-outline-dark backbtn' onClick={back} />
                            </div>
                        </div>

                    </div >
            }
        </>
    )
}

export default Readblog