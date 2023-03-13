import {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let url = `${process.env.REACT_APP_API_URL}/recipe`
let token = process.env.REACT_APP_TOKEN

export default function Profile() {
  const navigate = useNavigate();
  const [data,setData] = useState()
  const [show, setShow] = useState(false);
  const [selected,setSelected] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    getData()
  },[])
  
  const getData = () => {
    axios.get(url+`/myRecipe`,{
      headers:{
        "Authorization": token
      }
    }).then((res)=>{
      console.log(res)
      setData(res.data.data)
    }).then((err)=>{
      console.log(err)
    })
  }

  const confirmDelete = (id) => {
    setSelected(id)
    handleShow()
  }

  const deleteData = (id) => {
    axios.delete(url+`/delete/${id}`,{
      headers:{
        "Authorization": token
      }
    }).then((res)=>{
      console.log("delete data index ke ", id)
      console.log(res)
      handleClose()
      getData()
    }).then((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <div className='container mb-5'>
          <Navbar />
          <div className='row mt-5'>
            <div className='col-2' style={{fontWeight: 300,borderBottom: '7px solid #EFC81A'}}>
              <h2>Recipes</h2>
            </div>
            <div className='col-2 text-center' style={{fontWeight: 300,color: 'grey',borderBottom: '7px solid #EFC81A'}}>
              <h2>Bookmarked</h2>
            </div>
            <div className='col-2 text-end' style={{fontWeight: 300,color: 'grey',borderBottom: '7px solid #EFC81A'}}>
              <h2>Liked</h2>
            </div>
          </div>
          <main className='product-space'>
              <div className='container'>
                      {data?.map((item,index) => {
                        return (
                          <div key={index+1} className='col-md-6' style={{marginTop: 50}}>
                            <article key={item.id} className="main-div row">
                              <div className="main-img col">
                                <img src={item.photo} style={{maxHeight: 200}} />
                              </div>
                              <div className="content col">
                                  <div className="title">
                                    <h4>{item.name}</h4>
                                    <p>Ingredients :<br></br>{item.ingredient}</p>
                                  </div>
                                  <p className='align-text text-center btn btn-warning w-100' style={{color: "white"}}>10 Likes - 12 Comment - 3 Bookmark</p>
                                  <div className='row'>
                                    <div className='col-6'>
                                      <Button className='w-100' style={{color: 'white'}} variant="info" onClick={()=>navigate(`/profile/editRecipe/${item.id}`)}>
                                        Edit Menu
                                      </Button>
                                    </div>
                                    <div className='col-6'>
                                      <Button className='w-100' style={{color: 'white'}} variant="danger" onClick={()=>confirmDelete(item.id)}>
                                        Delete Menu
                                      </Button>
                                    </div>
                                  </div>
                              </div>
                            </article>
                          </div>
                        )
                      })}
              </div>
          </main>
      </div>
      <Footer />

      <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete this recipe ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>deleteData(selected)}>
            Delete data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}