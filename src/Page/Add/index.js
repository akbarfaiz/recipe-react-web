import {useState,useEffect} from 'react'
import axios from 'axios'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'

let token = process.env.REACT_APP_TOKEN
let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Add() {
  const [inputData,setInputData] = useState({
    name:"",ingredient:"",category_id:1
  })
  const [photo,setPhoto] = useState()
  const [alert,setAlert] = useState(false)
  
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
    console.log(e.target.files[0])
  }

  const postForm = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",inputData.name)
    formData.append("ingredient",inputData.ingredient)
    formData.append("category_id",inputData.category_id)
    formData.append("photo",photo)
    console.log(formData)
    axios.post(url,formData,{
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": token
      }
    }).then((res)=>{
      console.log("input data success")
      console.log(res)
      setAlert(true)
    }).catch((err)=>{
      console.log("input data fail")
      console.log(err)
    })
  }


  return (
    <div>
      <div className='container'>
        <Navbar />
        <h1 className='text-center mt-5'>Add Recipe</h1>
          <form onSubmit={postForm} className="container mb-5">
              <input type="file" name="photo" placeholder='photo' onChange={handlePhoto} className="form-control my-5" />
              <input type="text" value={inputData.name} name="name" placeholder='title' required onChange={handleChange} className="form-control my-5" />
              <input type="text" value={inputData.ingredient} name="ingredient" placeholder='ingredient' required onChange={handleChange} className="form-control  my-5" />
              <button type='submit' className='btn btn-warning w-100' style={{color: 'white'}}>Post</button>
          </form>

          <div className="container">

          {  alert && <div className="alert alert-success my-2" role="alert" onClick={()=>setAlert(false)}>
            Input data success
          </div>}

          </div>
      </div>
      <Footer />
    </div>
  )
}