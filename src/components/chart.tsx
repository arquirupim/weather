import { Group } from '@visx/group';
import { extent } from '../resource/js/common';
import { weatherStore } from '../resource/js/store';
import { scaleLinear} from 'd3-scale';
import { AxisLeft, AxisBottom } from '@visx/axis'
import { LinePath } from '@visx/shape';


interface CurveProps{
  width: number;
  height: number;
  data?: any;
};

interface WeatherData{
    time: String,
    temperature: number,
    weather: String,
    index: number,
};
//selector
const getTime = (d:WeatherData) => d.time;
const getTemp = (d:WeatherData) => d.temperature;
const getWeather = (d:WeatherData) => d.weather;
const getIndex = (d:WeatherData) => d.index;

function Chart({ width = 700, height = 400}: CurveProps) {
    const [weatherData] = weatherStore((state)=>[state.data])

    const margin = { top: 15, right: 5, bottom: 15, left: 5 };
    // defining inner measurements
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //  x scale
    const timeScale = scaleLinear({
        range: [0, innerWidth],
        domain: extent(weatherData, getIndex),
        nice: true
        })
    
    //  y scale
    const rdScale = scaleLinear({
         range: [innerHeight, 0],
         domain: extent(weatherData, getTemp),
         nice: true,
    });

    //colours for lines
    const colors = ['#43b284', '#fab255']

    // data for lines
    let dataX: number[] = [];
    let dataY: number[] = [];
    weatherData.forEach((el, index)=>{
        dataX.push(index)
        dataY.push(el.temperature)
    })
    

    const series = [[dataX,dataY]]

    console.log(timeScale())
    

    return(
    <svg width={width} height={height} >
        {series.map((sData, i) => (
            <LinePath
                key={i}
                stroke={colors[i]}
                strokeWidth={3}
                data={sData}
                x={(d) => timeScale(getIndex(d)) ?? 0}
                y={(d) => rdScale(getTemp(d)) ?? 0}
            />
        ))}
        <rect x={0} y={0} width={width} height={height} fill={'#718096'} rx={14} />
        <Group left={margin.left} top={margin.top}>
        <rect x={0} y={0} width={innerWidth} height={innerHeight} fill={'#A0AEC0'} />
        </Group>
        
    </svg>
    );
}


export default Chart;