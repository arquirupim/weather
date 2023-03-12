import { Group } from '@visx/group';
import { weatherStore } from '../resource/js/store';
import { extent, max, min } from 'd3-array';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {GridRows, GridColumns} from '@visx/grid';
import {useTooltip} from '@visx/tooltip';

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

function Chart({ width = 1000, height = 800}: CurveProps) {
    //linepath, grid, axis
    const [weatherData] = weatherStore((state)=>[state.data]);

    const margin = { top: 40, right: 40, bottom: 50, left: 40};

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const colors = ['#43b284', '#fab255']

    let intlOption = {
        timeZone: "Asia/Seoul",
        dateStyle: "short",
        timeStyle: "short",
        hour12: false,
      }

    const formatDate = ((time : string) => new Intl.DateTimeFormat("ko-kr", intlOption).format(new Date(time)))
    const xScale = scaleTime({
        range : [0, innerWidth],
        domain: extent(weatherData, getTime) as [Date, Date],
        nice : true
    });
    
    console.log(extent(weatherData, getTime))

    const yScale = scaleLinear({
        range : [innerHeight, 0],
        domain: [min(weatherData, getTemp), max(weatherData, getTemp) as number],
        nice : true
    });

    //tooltip
    const { 
        tooltipData, 
        tooltipLeft = 0, 
        tooltipTop = 0, 
        showTooltip, 
        hideTooltip 
    } = useTooltip();

    return(
    <svg width={width} height={height} >
        <rect x={0} y={0} width={width} height={height} fill={'#718096'} rx={14} />
        
        <Group left={margin.left} top={margin.top}>
            
        <rect x={0} y={0} width={innerWidth} height={innerHeight} fill={'#A0AEC0'} />
        <AxisLeft
            tickTextFill={'#EDF2F7'}
            stroke={'#EDF2F7'}
            tickStroke={'#EDF2F7'}
            scale={yScale}
            tickLabelProps={() => ({
                fill: '#EDF2F7',
                fontSize: 11,
                textAnchor: 'end',
            })} 
        />
        <AxisBottom
            scale={xScale}
            stroke={'#EDF2F7'}
            tickFormat={formatDate}
            tickStroke={'#EDF2F7'}
            tickTextFill={'#EDF2F7'}
            top={innerHeight}
            tickLabelProps={() => ({
                fill: '#EDF2F7',
                fontSize: 11,
                textAnchor: 'middle',
            })} 
        />
        <GridRows 
            scale={yScale} 
            width={innerWidth} 
            height={innerHeight - margin.top} 
            stroke='#EDF2F7' 
            strokeOpacity={0.2} 
        />
        <GridColumns 
            scale={xScale} 
            width={innerWidth} 
            height={innerHeight} 
            stroke='#EDF2F7' 
            strokeOpacity={0.2} 
        />
        <LinePath
            key={1}
            data={weatherData}
            strokeWidth={3}
            stroke={colors[1]}
            x={(d) => xScale(getTime(d)) ?? 0}
            y={(d) => yScale(getTemp(d)) ?? 0}
        />
        </Group>
    </svg>
    );
}


export default Chart;