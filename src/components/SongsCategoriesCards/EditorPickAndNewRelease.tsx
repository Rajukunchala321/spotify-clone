import React from 'react'
import './Index.css';

export type dataTypes ={
  message:string,
  categories: {
    items:Array<{
    id:string,
    name:string,
    icons: Array<{
      url:string,
    }>,
  }>,

  },
  

  playlists: {
    items: Array<{
      id:string,
      name: string,
    images: Array<{
        height: number,
        url: string,
        width: number
      }>,

  }>

}}

type Props ={
  data: dataTypes | null,
  errorMsg: any
}

const EditorPickAndNewRelease = ({ data, errorMsg }: Props) => {
  console.log(data)
  return (
    <div className='cards-main-container'>
      <h3>{data?.message}</h3>
      
      { errorMsg?.editorPickApi ? <>
       <div className='error-message-container'>
        <p>{errorMsg.editorPickApi}</p>
       </div>
      </>:<>
      <div className='cards-container'>
        {
          data?.playlists.items.map((eachItem)=>{
            return(
              <a className='each-card-container' href={`playlists-details/${eachItem.id}`} key={eachItem.id}>
              <img src={eachItem.images[0]?.url || ''} alt={eachItem.name} loading='lazy' />
          <p>{eachItem.name}</p>
        </a>
            )
          })
        }
      </div></> }
    </div>
  )
}

export default EditorPickAndNewRelease