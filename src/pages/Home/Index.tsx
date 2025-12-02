import React from 'react';
import './Index.css';
import Navbar from '../../components/Navbar/Index' 
import EditorPickAndNewRelease from '../../components/SongsCategoriesCards/EditorPickAndNewRelease'
import useHomeData from "../../components/CustomHooks/useHomeData";
const Home = () => {
  const {loading, error, editorPickApi, genresMoodsApi, newReleaseApi} = useHomeData();

  return (
    <section className='home-section'>
      <Navbar />
      <div className='home-all-playlist-container' >
        <EditorPickAndNewRelease data={editorPickApi}/>

      </div>
    </section>
  );
};

export default Home;
