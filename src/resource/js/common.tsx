import '../css/common.css'
import axios from 'axios';
import { loadingstore } from './store';


const weatherAdress = import.meta.env.VITE_WEATHER_ADDRESS
const isDev = import.meta.env.DEV

function getLocation(){
  return new Promise((resolve, reject)=>{
    try{
      navigator.geolocation.getCurrentPosition((position) =>{
        if(import.meta.env.DEV == true){
          console.log(position.coords.latitude + ', ' + position.coords.longitude +', ' + position.coords.altitude);
        }
        let data : any[] = [];
        const pos = position.coords
        axios.get(weatherAdress+ 'lat=' + pos.latitude + '&lon=' + pos.longitude + '&altitude=' + pos.altitude)
        .then((res)=>{
          res.data.properties.timeseries.forEach((el : any)=>{
            let time = el.time
            let temp = el.data.instant.details.air_temperature;
            let weather = el.data.next_1_hours?.summary.symbol_code !== undefined ?
              el.data.next_1_hours.summary.symbol_code :
              el.data.next_6_hours?.summary.symbol_code;
            data.push([time, temp, weather]); 
          });
          setTimeout(()=>{
            resolve(data)
          },1000)
        })
      })
    }catch(err){
      console.log(err)
    }
  })
}

interface alert{
  isLoading : boolean,
  isError ?: boolean,
}

function Alert(props : alert={
  isLoading : false,
  isError : false
})
{
  if(props.isLoading === undefined || props.isLoading === false){
    return null;
  }
  const [loadInit, loadDone] = loadingstore((state)=> [state.loadInit, state.loadDone])

    return(
      <div className='loadingWrap'>
        <span className='loading'>nowLoading</span>
      </div>
    )
}


export {getLocation, Alert}
