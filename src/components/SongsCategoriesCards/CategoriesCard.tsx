import React from 'react'

import type { dataTypes } from './EditorPickAndNewRelease';


type Props ={
  data: dataTypes | null,
  errorMsg: any
}
const CategoriesCard = ({data, errorMsg}: Props) => {
  return (
    <div className='cards-main-container'>
      <h3>Genres & Moods</h3>
      { errorMsg?.genresMoodsApi ? <>
          <div className='error-message-container'>
        <p>{errorMsg.genresMoodsApi}</p>
       </div>
      </>:<>
      
      <div className='cards-container'>
        {
          data?.categories?.items.map((eachCard, index)=>(
            
              <a className={`categories-card categories-card-${index}`}  key={eachCard.id} href={`category-playlists/${eachCard.id}`}>
                 <p>{eachCard.name}</p>
                  <img src={eachCard.icons[0].url} alt='Hollywood' loading='lazy'/>
        </a>
            
          ))
        }
      </div></>}

    </div>
  )
}

export default CategoriesCard
