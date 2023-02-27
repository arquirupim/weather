import '../resource/css/root.css'
import { ReactElement } from 'react'
import {Alert} from '../resource/js/common'
import { loadingstore, weatherStore } from '../resource/js/store'
import Chart from '../components/chart';



function Result() : ReactElement{
    const [isLoading] = loadingstore((state)=> [state.isLoading])
    const [weatherData, setData] = weatherStore((state)=>[state.data, state.setData])
    // console.log(weatherData)
    return(
        <div className="mainContainer">
            <Alert isLoading={isLoading} />
            <Chart></Chart>
        </div>
    )
}


export default Result