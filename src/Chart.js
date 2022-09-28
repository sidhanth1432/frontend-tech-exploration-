
import './bar/bar.css'
import './App.css';
import { AxisBottom } from './bar/AxisBottom';
import { AxisLeft } from './bar/AxisLeft';
import { PieMarks } from './bar/PieMarks';
import { LineMarks } from './bar/LineMarks';
// import  ColorLegend  from './bar/ColorLegend';

import {format,scaleBand,scaleLinear,scaleOrdinal,max,arc,pie} from 'd3'; 

import { getPopulation } from './data/api';


import { Marks } from './bar/Marks';
import {useState,useEffect } from 'react';


// import {Dropdown} from './bar/DropDown';


function Chart() {
const w=window.innerWidth<960?window.innerWidth:960;
  const[width,setWidth]=useState(w);
  
  const[height,setHeight]=useState(500);

  const[data,setData]=useState([]);
  const[dataLinePie,setdataLinePie]=useState([]);


const initialYAttribute='country';
const [YAttribute,setYAttribute]=useState(initialYAttribute);
const [level,setLevel]=useState(0);

const yValue=d=>d['value'];


useEffect(()=>{ 
  getPopulation().then((res) => {
    const data1=res.data;
var temp=data1[`${YAttribute}`]
    setData(temp);
temp=data1[`LinePie`];
setdataLinePie(temp);
console.log(data1);    
  //   const data1=data.splice(1);
  // setstateData(data1);
  
  //   console.log(data1);
  //   setData(data[0]);

  }
  
  );
 
function handleResize() {
  if(window.innerWidth<960){
  setWidth(window.innerWidth);}
  else{setWidth(960);}
if(window.innerHeight<500){
  setHeight(window.innerHeight);}
  else{setHeight(500);}



}

window.addEventListener('resize', handleResize);
},[width,YAttribute])




// const tooldiv=select('#barchart')
// .append('div')
// .style('visibility','hidden')
// .style('position','absolute')
// .style('background-color','red')
// .style('padding','0.5rem')
// .style('border-radius','0.3rem')
// .style('text-align','center');

const [hoveredValue,setHoveredValue]= useState(null);
const fadeOpacity=0.2; 

  
const xAxisLabelOffset =50;  

  
const margin={top:20,right:width>500?160:140,bottom:65,left:20};

const colorMargin={top:20,right:100,bottom:65,left:20};



// const attributes=[{value:"country",label:"Country"},
//   {value:"china",label:"CHINA"},
// {value:"india",label:"INDIA"}];


//   {value:"popcount",label:"Country Population"},
// {value:"statepopcount",label:"State Population"}];


const xValue=d=>d['popcount'];

const colorValue =d =>d.value;
// const yValue=function(d){
//   return d.Country;
//   if(XAttribute===d.Country){
//     return d.State;
//   }
// }

// d=>d.Country;



const colorLegendLabel=YAttribute.toUpperCase();
const colorLegendLabelLinePie="Country".toUpperCase();

// const xAxisLabelOffset =50;  
const xAxisTickFormat=tickValue=>format(".2s")(tickValue).replace('G','B');

if(!data && !dataLinePie){
    return <pre>Loading...</pre>
  }

  const filteredData=data.filter(d=> hoveredValue===colorValue(d));
  
  
  
const innerHeight=height-margin.top-margin.bottom;
const innerWidth=width-margin.left-margin.right;

const colorWidth=width>800?(width/4)-colorMargin.left-colorMargin.right:(width)-colorMargin.left-colorMargin.right;
const radius=width>500?(innerHeight/4):(innerHeight/8);

// -100;

const xPixelsPerTick=70;



const xScale=scaleLinear()
.domain([0,max(data,xValue)])
.range([0,innerWidth]);




const xScaleLinePie=scaleLinear()
.domain([0,max(dataLinePie,xValue)])
.range([0,innerWidth]);

  const yScale=scaleBand()
  .domain(data.map(yValue))
  .range([0,200])
  .paddingInner(0.15);

  const yScaleLinePie=scaleBand()
  .domain(dataLinePie.map(yValue))
  .range([0,innerHeight])
  .paddingInner(0.15);

  const colorScale=scaleOrdinal()
  .domain(data.map(colorValue))
  .range(['#E3BA22','#E6842A'
,'#137B80','#8E6C8A'
,'#978F80','#E5E2E0'
,'#F2DA57','#F6B656'
,'#42A5B','#B396AD']);


const colorScaleLinePie=scaleOrdinal()
.domain(dataLinePie.map(colorValue))
.range(['#E3BA22','#E6842A'
,'#137B80','#8E6C8A'
,'#978F80','#E5E2E0'
,'#F2DA57','#F6B656'
,'#42A5B','#B396AD']);



const arcGenerator=arc().innerRadius(0).outerRadius(radius);

const formattedData =pie().value(d=>d.popcount)(dataLinePie);


const filteredFormattedData=formattedData.filter(d=> hoveredValue===colorValue(d.data));



  
const ColorLegend =(tempColorScale)=>{
  const xcord=(i)=>{

if(width>800){return 0;}
    return (i*(colorWidth/2))%colorWidth;
   }
   
   const ycord=(i)=>{

    if(width>800){return((i)*25);}
if((i+1)%2){return((i+1)*25);}
else{return((i)*25);}
    
     }

  return(
    tempColorScale.domain().map((domainValue, i) => (
      <g key={i} className="tick" transform={`translate(${xcord(i)},${ycord(i)})`} 
      onMouseEnter={()=>{console.log(domainValue);setHoveredValue(domainValue);}}
      onMouseOut={()=>{setHoveredValue(null);}}
      opacity={hoveredValue && domainValue!==hoveredValue?fadeOpacity:1}
      >
        <circle key={domainValue} fill={tempColorScale(domainValue)} r={10} />
        
        <text className="legend-text" key={i} x={20} dy=".32em">
          {domainValue}
        </text>
      </g>
    ))
    );

}




  return (

    // bar Chart

<div className="flex-container">

<div className='svg1' 


// style={{marginBottom: "2rem" }}

>

<div>
<button type="button" hidden={level===0?"hidden":""} className="btn btn-primary float-right" onClick={() => {if(level===1){setLevel(0);setYAttribute('country');}}}>Back to Country</button>
</div>
  
  {/* <label htmlFor="y-select">Y:</label>
<Dropdown
        options={attributes}
        id="y-select"
        selectedValue={YAttribute}
        onSelectedValueChange={setYAttribute}
      /> */}
       <svg 

      width={width} height={height}
      
      >
      
        <g transform={`translate(${margin.left},${margin.top})`}>

<AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} innerWidth={innerWidth} xPixelsPerTick={xPixelsPerTick} />

{/* {xScale.ticks().map(tickValue =><g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}><line y2={innerHeight} stroke="black" />
<text style={{textAnchor:'middle'}} dy='0.71em' y={innerHeight+3}>{tickValue}</text>

</g>)} */}
{/* 
<AxisLeft yScale={yScale}/> */}

<text 

className='axis-label' 

style={{textAnchor:'middle'}}
x={innerWidth/2} y={innerHeight+50} >Population(in Billions)</text>

{/* 
{yScale.domain().map(tickValue =>


<text key={tickValue} style={{textAnchor:'end'}} dy='0.32em' x={-3} y={yScale(tickValue)+yScale.bandwidth()/2}>{tickValue}</text>


)}
 */}

 {/* <g transform={`translate(${innerWidth}+50)`} > */}
 
 {/* <g transform={`translate(${innerWidth + 60}, 60)`}>

<ColorLegend colorScale={colorScale} />

</g> */}

{/* <g className="flex" transform={`translate(${innerWidth + 30}, 60)`}>

<text className='axis-label' textAnchor="middle" x={50} y={-25}>{colorLegendLabel}</text>

<ColorLegend colorScale={colorScale} tickSpacing={25} tickSize={7} tickTextOffset={20}
onHover={setHoveredValue}
hoveredValue={hoveredValue}
fadeOpacity={fadeOpacity}
/>
</g>
 */}
 <g className="tooltip-bar_area">
          <text className="tooltip-bar_area__text"></text>
          <text y={20} className="tooltip-bar_pop__text"></text>
        </g>
        <g transform={`translate(0,0)`}>
        <button>edit</button></g>
<g opacity={hoveredValue?fadeOpacity:1}>
<Marks updateLevelFunc={setLevel} level={level} yAxisAttributeFunc={setYAttribute} data={data} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>
</g>
<Marks updateLevelFunc={setLevel} level={level} yAxisAttributeFunc={setYAttribute}  data={filteredData} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>



{/* {data.map((d)=><rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>)} */}

</g>
      </svg>






      </div>
      <div className='svg1' >
       <svg width={width>800?width/4:width} height={height} >

         <g transform={`translate(${margin.left},${margin.top})`}> 

        <g className="flex" transform={`translate(${30}, 60)`}>

<text 

// className='axis-label' textAnchor="middle" 

style={{textAnchor:'middle'}} x={50} y={-25} className='axis-label'>{colorLegendLabel}</text>
{ColorLegend(colorScale)}
{/* <ColorLegend colorScale={colorScale} tickSpacing={100} tickSize={7} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} innerWidth={innerWidth}/> */}

</g>
     
        </g>
      
     
      </svg>






      </div>
      

{/* line chart */}
<div  className='svg1'>

<svg 

width={width} height={height}

>
  <g transform={`translate(${margin.left},${margin.top})`}>

  <AxisBottom xScale={xScaleLinePie} innerHeight={innerHeight} tickFormat={xAxisTickFormat} innerWidth={innerWidth} xPixelsPerTick={xPixelsPerTick} />

{/* {xScale.ticks().map(tickValue =><g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}><line y2={innerHeight} stroke="black" />
<text style={{textAnchor:'middle'}} dy='0.71em' y={innerHeight+3}>{tickValue}</text>

</g>)} */}

<AxisLeft yScale={yScale}/>

<text 
style={{textAnchor:'middle'}} className='axis-label' x={innerWidth/2} y={innerHeight+xAxisLabelOffset} >Population(in Billions)</text>

{/* 
{yScale.domain().map(tickValue =>


<text key={tickValue} style={{textAnchor:'end'}} dy='0.32em' x={-3} y={yScale(tickValue)+yScale.bandwidth()/2}>{tickValue}</text>


)}
*/}

{/* <g transform={`translate(${innerWidth}+50)`} > */}

{/* <g transform={`translate(${innerWidth + 60}, 60)`}>

<ColorLegend colorScale={colorScale} />

</g> */}
{/* <g className="flex" transform={`translate(${innerWidth + 30}, 60)`}>

<text className='axis-label' textAnchor="middle" x={50} y={-25}>{colorLegendLabel}</text>

<ColorLegend colorScale={colorScale} tickSpacing={25} tickSize={7} tickTextOffset={20}
onHover={setHoveredValue}
hoveredValue={hoveredValue}
fadeOpacity={fadeOpacity}
/>
</g> */} <g className="tooltip-line_area">
    <text className="tooltip-line_area__text"></text>
    <text y={20} className="tooltip-line_pop__text"></text>
  </g>

 {/* <g >
<LineMarks circleRadius={7} data={dataLinePie} colorScale={colorScaleLinePie} xScale={xScaleLinePie} yScale={yScaleLinePie} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>
</g>  */}

<LineMarks fadeOpacity={fadeOpacity} hoveredValue={hoveredValue} circleRadius={7} data={dataLinePie} colorScale={colorScaleLinePie} xScale={xScaleLinePie} yScale={yScaleLinePie} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat} />






{/* <g opacity={hoveredValue?fadeOpacity:1}> */}

{/* </g> */}

{/* <Marks data={filteredData} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/> */}


{/* {data.map((d)=><rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>)} */}

</g>
</svg>
</div>
{/* <div className='svg1' >
 <svg 

width={width>500?width/4:width} height={height}

>
  <g transform={`translate(${margin.left},${margin.top})`}>
  <g className="flex" transform={`translate(${30}, 60)`}>

<text className='axis-label' textAnchor="middle" x={50} y={-25}>{colorLegendLabel}</text>

<ColorLegend colorScale={colorScale} tickSpacing={25} tickSize={7} tickTextOffset={20}
onHover={setHoveredValue}
hoveredValue={hoveredValue}
fadeOpacity={fadeOpacity}
/>
</g>
  </g>
</svg>






</div> */}

<div className='svg1' >
 <svg width={width>800?width/4:width} height={height} >

   <g transform={`translate(${margin.left},${margin.top})`}> 

  <g className="flex" transform={`translate(${30}, 60)`}>

<text 
 className='axis-label' textAnchor="middle" x={50} y={-25}>{colorLegendLabelLinePie}</text>
{ColorLegend(colorScaleLinePie)}
{/* <ColorLegend colorScale={colorScale} tickSpacing={100} tickSize={7} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} innerWidth={innerWidth}/> */}

</g>

  </g>


</svg>






</div>






<div className='svg1'>

<svg 

width={width} height={width>500?innerHeight:innerHeight/2}

>
   <g transform={`translate(${margin.left},${margin.top})`}> 
  
  {/* <g className="flex" transform={`translate(${2*radius+ 30}, 30)`}>



<text className='axis-label' textAnchor="middle" x={50} y={-25}>{colorLegendLabel}</text> 

<ColorLegend colorScale={colorScale} tickSpacing={25} tickSize={7} tickTextOffset={20}
onHover={setHoveredValue}
hoveredValue={hoveredValue}
fadeOpacity={fadeOpacity}
/>

{/* 
{ColorLegend()} */}

{/* 
</g>  
*/}



<text className='axis-label' x={ innerWidth/2} y={2*radius+30} textAnchor="middle"
style={{textAnchor:'middle'}}>Population(in Billions)</text>

<g className="tooltip-pie_area">
    <text className="tooltip-pie_area__text"></text>
    <text y={20} className="tooltip-pie_pop__text"></text>
  </g>


<g transform={`translate(${innerWidth/2},${radius})`}>


<PieMarks  arcGenerator={arcGenerator} data={filteredFormattedData} colorScale={colorScaleLinePie} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat} />
</g>
<g opacity={hoveredValue?fadeOpacity:1} transform={`translate(${innerWidth/2},${radius})`}>
<PieMarks arcGenerator={arcGenerator} data={formattedData} colorScale={colorScaleLinePie} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>
</g>

</g>
</svg>
</div>



<div className='svg1' >
 <svg width={width>800?width/4:width} height={height} >

   <g transform={`translate(${margin.left},${margin.top})`}> 

  <g className="flex" transform={`translate(${30}, 60)`}>

<text className='axis-label' textAnchor="middle" x={50} y={-25} 
style={{textAnchor:'middle'}}>{colorLegendLabelLinePie}</text>
{ColorLegend(colorScaleLinePie)}
{/* <ColorLegend colorScale={colorScale} tickSpacing={100} tickSize={7} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} innerWidth={innerWidth}/> */}

</g>

  </g>


</svg>






</div>

</div>

      


   );
}

export default Chart;
