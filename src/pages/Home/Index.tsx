import React from 'react';
import './Index.css';
// Router
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// Assests
import logo from "../../assests/music.png";
// Components
import Navbar from '../../components/Navbar/Index' 
import EditorPickAndNewRelease from '../../components/SongsCategoriesCards/EditorPickAndNewRelease'
// Custom hook to fetch home data
import useHomeData from "../../components/CustomHooks/useHomeData";
const Home = () => {
  
  const {loading, errors, editorPickApi, genresMoodsApi, newReleaseApi} = useHomeData();
  if(loading){
    return (
      <>
       <div className='loading-section'>
        <img src={logo} alt='loading image' />
        <p>Loading....</p>
       </div>
      </>
    )
  }
  
  if(Object.keys(errors).length ===3){
   return(<>
       <div className='loading-section'>
        <p>Something went wrong. Please try again</p>
       </div>
      </>) 
  }

  if (Cookies.get("jwtToken") === undefined){
  return <Navigate to='/login' replace/>
}

  return (
    <section className='home-section'>
      <Navbar />
      <div className='home-all-playlist-container' >
        <EditorPickAndNewRelease errorMsg = {errors} data={editorPickApi}/>
       

      </div>
    </section>
  );
};

export default Home;