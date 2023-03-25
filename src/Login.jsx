import React from 'react'
import "./Login.css"
import { useFormik } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Config } from "./Config"
import { useState } from 'react'

import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
function Login() {
    const navigate = useNavigate()

    const [check, setCheck] = useState(false)
    const [response, setResponse] = useState("")
    const [dialog, setDialog] = useState(false)
    const [nav, setNav] = useState(false)
    const [loading, setLoading] = useState(false)

    const login = useFormik({
        initialValues: {
            username: "",
            password: ""
        },

        validate: (values) => {
            const errors = {}

            if (!values.username) {
                errors.username = "Please enter the username"
            }
            else if (values.username.length <= 3 || values.username.length >= 15) {
                errors.username = "Please enter the 4 to 15 characters"
            }
            // const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')
            if (!values.password) {
                errors.password = "Please enter the password"
            }
            else if (values.password.length <= 3 || values.password.length >= 15) {
                errors.password = "Please enter the 4 to 15 password"
            }
            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true)
                const user = await axios.post(check ?`${Config.api}/blogger/login`:`${Config.api}/user/login`, values)

                localStorage.setItem("blog", user.data.token)

                if (user.data.message === "success") {
                    // setDialog(true)
                    setLoading(false)
                    const dashboard = check ? navigate("/bloggerdashboard") : navigate("/blog")
                    login.resetForm()
                    // setResponse(user.data.message)
                    // setNav(true)

                    localStorage.setItem("name", values.username)

                } else {
                    setLoading(false)
                    setDialog(true)
                    setResponse(user.data.message)

                }

            } catch (error) {
                //lert(error.response.data.message)
                alert("something went wrong")
            }
        }
    })

    const checkbox = () => {
        setCheck(!check)
    }

    const navi = () => {
        if (nav !== true) {
            navigate("/login")
        }
        setDialog(false)
    }


    return (
        <>
            <div className='container login'>

                <div >
                    {
                        dialog ? <div className='dialog1'>
                            < p style={{ color: "white" }}> {response}</p >
                            <input type="submit" className='btn btn-primary mx-auto' value="Done" onClick={navi} />
                        </div > : null
                    }
                </div>
                <div className='logimage'>

                </div>
                <div className='row'>
                <div className="col-lg-7 col-md-6 col-12 mx-auto">


                    <form onSubmit={login.handleSubmit} className={`loginform ${dialog ? "opacity-form" : ""}`}>

                        <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Login Form</h5>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input
                                name="username"
                                type={"text"}
                                id="staticEmail2"
                                onChange={login.handleChange}
                                onBlur={login.handleBlur}
                                value={login.values.username}
                                class={`form-control ${dialog ? "form" : ""}
                            ${login.errors.username ? "errors-box" : ""}
                            ${login.touched.username && !login.errors.username ? "success-box" : ""}`
                                }
                                disabled={dialog ? "disabled" : ""} />
                            {
                                login.errors.username ? <span className='errortext'>{login.errors.username}</span> : null
                            }
                        </div>

                        <div className="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="inputPassword2"
                                onBlur={login.handleBlur}
                                onChange={login.handleChange}
                                value={login.values.password}
                                class={`form-control ${dialog ? "form" : ""}
                            ${login.errors.password ? "errors-box" : ""}
                            ${login.touched.password && !login.errors.password ? "success-box" : ""}`
                                }
                                disabled={dialog ? "disabled" : ""} />
                            {
                                login.errors.password ? <span className='errortext'>{login.errors.password}</span> : null
                            }
                        </div>

                        <div className='text-center form-floating'>
                            <input class={`form-check-input ${dialog ? "form" : ""}`}
                                type="checkbox"
                                checked={check}
                                onChange={checkbox}
                                value="" id="flexCheckDefault"
                                disabled={dialog ? "disabled" : ""} />
                            <span>
                                <label class="form-check-label mx-2" for="flexCheckDefault">If you are Blogger?</label>
                            </span>
                        </div>


                        <div className="col-lg-12 mt-4" style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                            {/* mb-3 col-lg-6 col-md-6 col-12 py-lg-2 py-3 form-floating mx-auto my-1 */}
                            <button className={`btn btn-primary ${dialog ? "form" : ""} col-lg-12 logbtn mx-auto`}
                                disabled={dialog ? "disabled" : ""}
                                type={"submit"}>{loading ? <div style={{ display: "flex", justifyContent: "center" }}><ThreeDots
                                    height="30"
                                    width="40"
                                    radius="10"
                                    color="white"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                /></div> : "Login"} </button>
                        </div>


                    </form >

                </div>
                <div className='col-lg-5 details text-center'>
                    <h5 style={{color:"black"}}>Admin Login</h5>
                    <h6>username: surya</h6>
                    <h6>password: surya123</h6>
                    <h6 style={{color:"red"}}>Please click the checkbox</h6>
                    <hr></hr>
                    <h5 style={{color:"black"}}>User Login</h5>
                    <h6>username: surya</h6>
                    <h6>password: surya123</h6>
                </div>
                <div className='logimage1'>

                </div>
               
                </div>
            </div >


        </>
    )
}

export default Login