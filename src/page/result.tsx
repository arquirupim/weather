import '../resource/css/root.css'
import { ReactElement } from 'react'
import {Alert} from '../resource/js/common'
import SearchBar from '../components/searchBar'
import SearchGeo from '../components/geoSearch'
import { loadingstore } from '../resource/js/store'



function Result() : ReactElement{
    const [isLoading] = loadingstore((state)=> [state.isLoading])
    const time ='00'
    return(
            <div className="mainContainer">
                result
            </div>
    )
}


export default Result