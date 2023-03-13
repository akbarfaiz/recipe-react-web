import {useState,useEffect} from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Search() {
  const [data,setData] = useState()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keysearch = searchParams.get("search");
  const [keyword,setKeyword] = useState({
    search:keysearch || ""
  })

  const handleChange = (e) => {
    setKeyword({
      ...keyword,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    getData()
  },[])
  
  const getData = () => {
    axios.get(url+`?search=${keyword.search}`).then((res)=>{
      console.log(res)
      setData(res.data.data)
    }).then((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <div className='container mb-5'>
          <Navbar />
          <h1 className='mt-5' style={{color: '#2E266F'}}>Discover Recipe<br></br>& Delicious Food</h1>
          <Form className='row'>
            <Form.Group className="col-4" controlId="formBasicName">
              <Form.Control name='search' onChange={handleChange} className='w-100' type="text" placeholder="Search Restaurant or Food" />
            </Form.Group>
            <Button className='w-25' style={{color: 'white'}} variant="warning" type="submit">
              Search
            </Button>
          </Form>
          <div className='row'>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                New
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                Popular
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="success" type="submit">
                Vegetarian
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="success" type="submit">
                Breakfast
              </Button>
            </div>
          </div>
          <main className='product-space'>
              <div className='container'>
                      {data?.map((item,index) => {
                        return (
                          <div key={index+1} className='col-md-6' style={{marginTop: 50}}>
                            <Link to={`/search/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                              <article key={item.id} className="main-div row">
                                <div className="main-img col-6">
                                  <img src={item.photo} style={{maxHeight: 200}} />
                                </div>
                                <div className="content col">
                                    <div className="title">
                                      <h4>{item.name}</h4>
                                      <p>Ingredients :<br></br>{item.ingredient}</p>
                                    </div>
                                    <p className='align-text text-center btn btn-warning w-100' style={{color: "white"}}>10 Likes - 12 Comment - 3 Bookmark</p>
                                    <div className='row'>
                                      <div className='col-3'>
                                        <img src={require('../../Asset/karen.png')}></img>
                                      </div>
                                      <div className='col d-flex align-items-center'>
                                        <p>{item.creator}</p>
                                      </div>
                                    </div>
                                </div>
                              </article>
                            </Link>
                          </div>
                          
                        )
                      })}
              </div>
          </main>
      </div>
      <Footer />
    </div>
  )
}