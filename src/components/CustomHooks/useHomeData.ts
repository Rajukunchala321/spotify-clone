import React, {useEffect, useState} from 'react'
import axios, {AxiosError, AxiosResponse} from 'axios'
import Cookies from 'js-cookie';

type ApiErrors = { editorPickApi?: string; genresMoodsApi?: string; newReleaseApi?: string }

interface State {
  loading: boolean
  errors: ApiErrors | string
  editorPickApi: any | null
  genresMoodsApi: any | null
  newReleaseApi: any | null
}

const useHomeData = () => {
  const [state, setState] = useState<State>({
    loading: true,
    errors: {} as ApiErrors,
    editorPickApi: null ,
    genresMoodsApi: null,
    newReleaseApi: null,
  })

  useEffect(()=>{
    const jwtToken = Cookies.get("jwtToken");
    const header = {
        Authorization: `Bearer ${jwtToken}`,
        "content-type": 'application/json',
    }
    const fetchAll = async ()=>{
      let newErrors: ApiErrors = {}

      try{
        const result = await Promise.allSettled([
          axios.get("https://apis2.ccbp.in/spotify-clone/featured-playlists", {headers: header}),
          axios.get("https://apis2.ccbp.in/spotify-clone/categories", {headers: header}),
          axios.get("https://apis2.ccbp.in/spotify-clone/new-releases", {headers: header}),
        ]) as PromiseSettledResult<AxiosResponse<any>>[] 

        if(result[0].status === "fulfilled"){
          setState((prevState) => ({
            ...prevState,
            editorPickApi: (result[0] as PromiseFulfilledResult<AxiosResponse<any>>).value.data
          }));
        } else {
          newErrors.editorPickApi = "Failed to fetch Editor's Pick data";
        }

        if(result[1].status === "fulfilled"){
          setState((prevState) => ({
            ...prevState,
            genresMoodsApi: (result[1] as PromiseFulfilledResult<AxiosResponse<any>>).value.data
          }));
        } else {
          newErrors.genresMoodsApi = "Failed to fetch Genres & Moods data";
        }

        if(result[2].status === "fulfilled"){
          setState((prevState) => ({
            ...prevState,
            newReleaseApi: (result[2] as PromiseFulfilledResult<AxiosResponse<any>>).value.data
          }));
        } else {
          newErrors.newReleaseApi = "Failed to fetch New Releases data";
        }
      } catch(err){
        const error = err as AxiosError<{error_msg?:string}>
        setState((prevState)=>({
          ...prevState,
          errors: error?.response?.data?.error_msg || "Fetching data failed"
        }))
      }

      setState((prevState)=>({
        ...prevState,
        loading:false,
        errors:newErrors
      }))
    }

    fetchAll()

  }, [])

  const { loading, errors, editorPickApi, genresMoodsApi, newReleaseApi } = state
  return { loading, errors, editorPickApi, genresMoodsApi, newReleaseApi }
}

export default useHomeData