import '../css/common.css'
import axios from 'axios';

let intlOption = {
  timeZone: "Asia/Seoul",
  dateStyle: "short",
  timeStyle: "short",
  hour12: false,
}

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
          res.data.properties.timeseries.forEach((el : any, index : number)=>{
            let time = el.time
            let temp = el.data.instant.details.air_temperature;
            let weather = el.data.next_1_hours?.summary.symbol_code !== undefined ?
              el.data.next_1_hours.summary.symbol_code :
              el.data.next_6_hours?.summary.symbol_code;
            data.push({'time' : new Intl.DateTimeFormat("ko-kr", intlOption).format(new Date(time)),
                        'temperature' : temp,
                        'weather' : weather,
                        'index' : index
                      }); 
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

    return(
      <div className='loadingWrap'>
        <span className='loading'>nowLoading</span>
      </div>
    )
}

function extent(values : Array<T>, valueof:any) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}


export {getLocation, Alert, extent}
