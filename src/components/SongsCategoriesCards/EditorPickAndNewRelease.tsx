import React from 'react'
import './Index.css';

type Props ={
  data: object |null
}

const EditorPickAndNewRelease = (data: Props) => {
  
  return (
    <div className='cards-main-container'>
      <h3>heading placeholder</h3>
      <div className='cards-container'>
        <div className='each-card-container'>
          <img src='' alt='' loading='lazy' />
          <p>Telugu Romance</p>
        </div>
      </div>
    </div>
  )
}

export default EditorPickAndNewRelease