import React, {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import Cookies from 'js-cookie';

const useHomeData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null |string>(null);
  const [editorPickApi, setEditorPickApi] = useState<object |null>(null)
  const [genresMoodsApi, setGenresMoodApi] = useState<object |null>(null);
  const [newReleaseApi, setNewReleaseApi] = useState<null | object >(null);
  

  useEffect(()=>{
    const jwtToken = Cookies.get("jwtToken");
    const header = {
        Authorization: `Barrer ${jwtToken}`,
        "content-type": 'application/json',
    }
    const fetchAll =async ()=>{
        try{
            const [res1, res2, res3] =  await Promise.all([
                axios.get("https://apis2.ccbp.in/spotify-clone/featured-playlists", {headers: header}),
                axios.get("https://apis2.ccbp.in/spotify-clone/categories", {headers: header}),
                axios.get("https://apis2.ccbp.in/spotify-clone/new-releases", {headers: header}),
            ])
            setEditorPickApi(res1.data);
            setGenresMoodApi(res2.data);
            setNewReleaseApi(res3.data);
        }catch(err){
            const error = err as AxiosError<{error_msg?:string}>
            console.error(error?.response?.data.error_msg || "Fetching data failed");
            setError(error?.response?.data.error_msg || "Fetching data failed");
        }finally{
            setLoading(false)
        }

    } 
    fetchAll()

  }, [])

return { loading, error, editorPickApi, genresMoodsApi, newReleaseApi}

}

export default useHomeData