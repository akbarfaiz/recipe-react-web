import {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'

let token = process.env.REACT_APP_TOKEN
let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Edit() {
    let { id } = useParams();
    const [data,setData] = useState()
    const [editData,setEditData] = useState()
    const [photo,setPhoto] = useState()
    const [preview, setPreview] = useState(null);
    const [alert,setAlert] = useState(false)

    const handleChange = (e) => {
        setEditData({
          ...editData,
          [e.target.name]: e.target.value
        })
    }
    const handlePhoto = (e) => {
        setPhoto(e.target.files[0])
        console.log(e.target.files[0])
        window.URL.revokeObjectURL(preview);
        setPreview(window.URL.createObjectURL(e.target.files[0]));
    }

    useEffect(()=>{
        getData()
      },[])
      
    const getData = () => {
    axios.get(url+`/detail/${id}`,{
      headers:{
        "Authorization": token
      }
    }).then((res)=>{
        console.log(res)
        setData(res.data.data)
        setEditData({
            name:res.data.data[0].name,
            ingredient:res.data.data[0].ingredient,
            category_id:1
        })
    }).then((err)=>{
        console.log(err)
    })
    }
    

    const putForm = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",editData.name)
        formData.append("ingredient",editData.ingredient)
        formData.append("category_id",editData.category_id)
        formData.append("photo",photo)
        console.log(formData)
        axios.put(url+`/update/${id}`,formData,{
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization": token
          }
        }).then((res)=>{
          console.log("edit data success")
          console.log(res)
          setAlert(true)
        }).catch((err)=>{
          console.log("edit data fail")
          console.log(err)
        })
      }

    return(
      <div>
        <div className='container'>
            <Navbar />
            <h1 className='text-center mt-5'>Edit Recipe</h1>
            {data?.map((item,index) => {
              return (
                <div key={index+1}>
                  <form onSubmit={putForm} className="container text-center mb-5">
                      <img src={preview || item.photo} alt=""></img>
                      <input type="file" name="photo" placeholder='photo' onChange={handlePhoto} className="form-control my-5" />
                      <input type="text" value={editData.name} name="name" placeholder='title' required onChange={handleChange} className="form-control my-5" />
                      <input type="text" value={editData.ingredient} name="ingredient" placeholder='ingredient' required onChange={handleChange} className="form-control  my-5" />
                      <button type='submit' className='btn btn-warning w-100' style={{color: 'white'}}>Update</button>
                  </form>
                </div>
              )
            })}

            <div className="container">

            {  alert && <div className="alert alert-success my-2" role="alert" onClick={()=>setAlert(false)}>
                Edit data success
            </div>}

            </div>
        </div>
        <Footer />
      </div>
    )
}