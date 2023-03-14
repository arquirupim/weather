import { Group } from '@visx/group';
import { weatherStore } from '../resource/js/store';
import { extent, max, min, bisect, bisector } from 'd3-array';
import { Line, LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {GridRows, GridColumns} from '@visx/grid';
import {TooltipWithBounds, useTooltip, defaultStyles, Tooltip} from '@visx/tooltip';
import {localPoint} from '@visx/event'
import { useCallback } from 'react';
import { GlyphCircle } from '@visx/glyph'

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

    const getD = (time : WeatherData) => {
        const output = weatherData.filter((el)=>{
            return el.time === time
        })
        return output
    }

    const bisectTemp = bisector(function(d) {return d.time}).left

    const handleTooltip = useCallback((event) => {
        const {x} = localPoint(event) || { x:0 };
        const x0 = xScale.invert( x - margin.left )

        const index = bisectTemp(weatherData, x0, 1);
        console.log(index)

        const d0 = weatherData[index - 1];
        const d1 = weatherData[index];
        let d = d0;

        if(d1 && getTime(d1)){
            d = x0.valueOf() - getTime(d0).valueOf() >
            getTime(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
            tooltipData : getD(d.time),
            tooltipLeft : x + margin.left,
            tooltipTop : yScale(getTemp(d))
        })
    })

    const tooltipStyles = {
        ...defaultStyles,
        backgroundColor: 'rgba(53,71,125,0.8)',
        color: 'white',
        width: 200,
        height: 100,
      };

    return(
        <div className='chartWrap'>
        <svg width={width} height={height} >
            
            <rect x={0} y={0} width={width} height={height} fill={'#718096'} rx={14} />
            
            <Group left={margin.left} top={margin.top}>
                
            <rect x={0} y={0} width={innerWidth} height={innerHeight} fill={'#A0AEC0'} />
            <rect
                x={0}
                y={0}
                width={innerWidth}
                height={innerHeight} 
                fill={'transparent'}
                onTouchStart={handleTooltip} 
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={() => hideTooltip()}
            />
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
                fill="transparent"
            />
            </Group>
            {/* tooltip */}
            {tooltipData && (
            <g>
                <Line
                    from={{x: tooltipLeft - margin.left, y:margin.top}}
                    to={{ x: tooltipLeft - margin.left, y:height - margin.bottom}}
                    stroke={'#EDF2F7'}
                    strokeWidth={2}
                    pointerEvents="none"
                    strokeDasharray="4,2"
                />
            </g>
            )}
            {tooltipData && tooltipData.map((d, i) => (
                <g>
                    <GlyphCircle
                        left={tooltipLeft - margin.left}
                        top={yScale(d.temperature) + margin.top}
                        size={110}
                        fill={"#EDF2F7"}
                        stroke={'white'}
                        strokeWidth={2}
                    />
                </g>
            ))}
        </svg>
        <div className='tooltip'>
        {tooltipData && (
            <div>
            <TooltipWithBounds
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
                style={tooltipStyles}
            >
             <p>{`Time: ${formatDate(getTime(tooltipData[0]))}`}</p>
             <p>{`Temp: ${getTemp(tooltipData[0])}ºC`}</p>
             <p>{`Weather: ${getWeather(tooltipData[0])}`}</p>
            </TooltipWithBounds>
            
            </div>
            
        )}

        </div>
        </div>
    
    );
}


export default Chart;