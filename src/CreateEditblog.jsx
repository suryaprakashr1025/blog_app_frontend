import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Config } from './Config'
import "./CreateEditblog.css"
import { useFormik } from 'formik'
import { UserContext } from './Usercontext'

function CreateEditblog() {
  const { blogid } = useParams()

  const navigate = useNavigate()
  const changevalue = useContext(UserContext)

  const edits = changevalue.edit

  const formik = useFormik({

    initialValues: {
      publisher_name: `${localStorage.getItem("name")}`,
      title: "",
      image: "",
      description: ""

    },

    validate: (values) => {
      const errors = {}

      if (!values.title) {
        errors.title = "Please Enter Title Name"
      }
      else if (values.title.length < 3 || values.title.length > 15) {
        errors.title = "Please Enter the 5 to 15 Characters"
      }

      if (!values.image) {
        errors.image = "Please Enter Image Link"
      }
      else if (values.image.length < 5) {
        errors.image = "Please Enter the upto 5 "
      }

      if (!values.description) {
        errors.description = "Please Enter Description"
      }

      return errors;
    },

    onSubmit: async (values) => {

      try {
        console.log(blogid.length > 5 ? "update" : "create")
        if (blogid.length > 5) {
          await axios.put(`${Config.api}/updateblog/${blogid}`, values)
          formik.resetForm()
          navigate("/bloggerdashboard")
        } else {
          await axios.post(`${Config.api}/createblog`, values)
          formik.resetForm()
          navigate("/bloggerdashboard")
        }


      } catch (error) {
        alert("Create and Edit error")
      }
    }

  })




  useEffect(() => {
    // console.log(edits[0].title)
     if (blogid.length > 5) {
    // console.log(edits[0].title)
    formik.setFieldValue("title", edits[0].title)
    formik.setFieldValue("image", edits[0].image)
    formik.setFieldValue("description", edits[0].description)
     }
  }, [])

const back = () =>{
 blogid.length > 5 ? navigate(`/viewblog/${blogid}`):navigate("/bloggerdashboard")
}


  return (
    <>

      <div className='text-center mb-5' style={{ padding: "18px 0px", backgroundColor: "black", color: "white" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px" }}>{blogid.length > 5 ? "Update Blog" : "Create Blog"}</label>
      </div>
      <div className='container'>
        <form onSubmit={formik.handleSubmit} className="form-group ">

          <div className='row'>

            <div className='col-lg-6 mb-3'>
              <div class="form-group">
                <label className="form-label">Title</label>
                <input type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control
                                    ${formik.errors.title ? "errors-box" : ""}
                                    ${formik.touched.title && !formik.errors.title ? "success-box" : ""}`}
                // disabled={dis ? "disabled" : ""}
                />
                {
                  formik.errors.title ? <span style={{ color: "red" }}>{formik.errors.title}</span> : null
                }
              </div>
            </div>

            <div className='col-lg-6 mb-3'>
              <div class="form-group">
                <label className='form-label'>Image Url</label>
                <input type="text"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control
                                    ${formik.errors.image ? "errors-box" : ""}
                                    ${formik.touched.image && !formik.errors.image ? "success-box" : ""}`}
                // disabled={dis ? "disabled" : ""} 
                />
                {
                  formik.errors.image ? <span style={{ color: "red" }}>{formik.errors.image}</span> : null
                }
              </div>
            </div>

            <div className='col-lg-12 mb-4'>
              <div class="form-group">
                <label className='form-label'>Description</label>
                <textarea type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="10"
                  className={`form-control 
                                    ${formik.errors.description ? "errors-box" : ""}
                                    ${formik.touched.description && !formik.errors.description ? "success-box" : ""}`}
                // disabled={dis ? "disabled" : ""}
                >
                </textarea>
                {
                  formik.errors.description ? <span style={{ color: "red" }}>{formik.errors.description}</span> : null
                }
              </div>
            </div>

            <div className='col-lg-12 text-center'>
              <input type="button" value="Back" className="btn btn-outline-dark" style={{ fontWeight: "bold" }} onClick={back} />
              <input type="Submit" value={blogid.length > 5 ? "Update" : "Create"} className="btn btn-outline-dark mx-3" style={{ fontWeight: "bold" }} />

            </div>
          </div>

        </form>
      </div>
    </>

  )
}

export default CreateEditblog