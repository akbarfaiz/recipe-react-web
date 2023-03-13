import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar,Container,Nav } from 'react-bootstrap'

export default function NavbarMenu() {
  return (
    <Navbar className='mt-1'>
          <Nav>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/' style={{color: '#2E266F'}} >Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/register'  style={{color: '#2E266F'}}>Register</Nav.Link>
            </Nav.Item>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/login'  style={{ color: '#2E266F'}}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/add' style={{color: '#2E266F'}}>Add Recipe</Nav.Link>
            </Nav.Item>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/search'  style={{ color: '#2E266F'}}>Search Menu</Nav.Link>
            </Nav.Item>
            <Nav.Item className='pe-5'>
              <Nav.Link href='/profile'  style={{ color: '#2E266F'}}>Profile</Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <div className='row' style={{borderLeft: "7px solid #EFC81A"}}>
              <div className='col-6 d-flex align-items-center justify-content-end'>
                <img src={require('../../Asset/dp.png')}></img>
              </div>
              <div className='col-6 ps-2'>
                <p>Ayudia</p>
                <p style={{fontWeight: 500}}>Logout</p>
              </div>
            </div>
          </Navbar.Collapse>
    </Navbar>
  )
}