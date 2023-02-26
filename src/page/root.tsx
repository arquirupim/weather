import '../resource/css/root.css'
import { ReactElement } from 'react'
import {Alert} from '../resource/js/common'
import SearchBar from '../components/searchBar'
import SearchGeo from '../components/geoSearch'
import { loadingstore } from '../resource/js/store'



function Main() : ReactElement{
    const [isLoading] = loadingstore((state)=> [state.isLoading])
    const time ='00'
    return(
            <div className="mainContainer">
                <Alert isLoading={isLoading} />
                {/* <SearchBar /> */}
                <SearchGeo></SearchGeo>
                <span className='lastUpdated'>last updated is {time}</span>
            </div>
    )
}


export default Main