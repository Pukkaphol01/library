import React from 'react'
import './home.css'

export default function Home() {
  return (
    <div className='homescreen'>
        <div className="text">
        <div className="logo">
            Library Web
        </div>
        <div className="action">
        <button type="button" class="btn btn-dark" onClick={()=>window.location='/login'}>Login</button>
        <button type="button" class="btn btn-dark"onClick={()=>window.location='/register'}>Register</button>
        </div>  
        </div>
       <div className="gradient" />
    </div>
  )
}
