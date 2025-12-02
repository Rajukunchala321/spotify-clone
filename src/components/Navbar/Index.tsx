import React from 'react'
import "./Index.css";
import websiteLogo from '../../assests/music.png'
import logout from '../../assests/logout.png'

const Index = () => {
  return (
    <nav>
        <img src={websiteLogo} alt='website-logo' loading='lazy'/>
        <div className='logout-container'>
            <img src={logout} alt='logout' loading='lazy' />
            <p>Logout</p>
        </div>
    </nav>
  )
}

export default Index