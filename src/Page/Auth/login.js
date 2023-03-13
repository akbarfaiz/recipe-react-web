import {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let url = `${process.env.REACT_APP_API_URL}/auth/login`

export default function Login(){
    const navigate = useNavigate();
    const [inputData,setInputData] = useState({
        email:"",password:""
    })

    const handleChange = (e) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value
        })
    }

    const postForm = (e) => {
        e.preventDefault()
        const newData = {
            email: inputData.email,
            password: inputData.password
        }
        axios.post(url,newData,{
          headers:{
            "Content-Type": "application/json",
            "Accept" : "application/json"
          }
        }).then((res)=>{
          console.log("login success")
          navigate('/home')
          console.log(res)
        }).catch((err)=>{
          console.log("login fail")
          console.log(err)
        })
    }

    return (
        <div className='container col-6 mt-5'>
            <h5 className='text-center mb-5' style={{color: '#EFC81A'}}>Recipe..</h5>
            <h5 className='text-center' style={{color: '#EFC81A'}}>Welcome</h5>
            <p className='text-center' style={{color: '#8692A6'}}>Log in into your exiting account</p>
            <div>
                <Form onSubmit={postForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' required onChange={handleChange} className='w-100' type="email" placeholder="Enter email address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' required onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I agree to terms & conditions" />
                    </Form.Group>
                    <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
            <p className='text-center mt-5'>Don’t have an account? <Link to={'/register'} style={{textDecoration: 'none',color: "#EFC81A"}}>Sign up</Link></p>
        </div>
    )
}