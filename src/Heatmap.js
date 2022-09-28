
import './App.css';

import {scaleBand,scaleOrdinal} from 'd3'; 

import { AxisLeft } from './bar/AxisLeft';

import { useState } from 'react';
import {jsondata} from './jsondata';
import {AxisBottomh} from './bar/AxisBottomh'
import {Marksh} from './bar/Marksh'


function Heatmap() {
  const w=window.innerWidth<960?window.innerWidth:960;
  const[width,setWidth]=useState(w);
  
  const[height,setHeight]=useState(300);
var x_elements = [...new Set(jsondata.map(function( item ) { return item.product; } ))];

var y_elements = [...new Set(jsondata.map(function( item ) { return item.country; } ))];


const margin={top:40,right:200,bottom:65,left:200};

const colorLegendLabel="Cost in Dollar";

const xAxisLabelOffset =50;  

const innerHeight=height-margin.top-margin.bottom;
const innerWidth=width>400?width-margin.left-margin.right:width-190;





  var itemSize = 22,
  cellSize = itemSize - 1;
  var xScaleh = scaleBand()
  .domain(x_elements)
  .range([0, (innerWidth)]);

  var yScaleh = scaleBand()
  .domain(y_elements)
  .range([0, (y_elements.length * itemSize)]);
  const yValueh=d=>d.country;
const xValueh=d=>d.product;

const colorValueh =d =>d.value;

const colorScaleh=scaleOrdinal()
  .domain([0.85, 1])
  .range(["#880808"]);
 const opacityObj={"1":"0.2","2.5":"0.4","4.5":"0.6"};
 const opacityArr=[{"0.5":"0.2"},{"2":"0.4"},{"4":"0.6"}];
 
const opacityh=(d)=>{
  if(d.value<0.5){return 0.2;}
  else if(d.value>0.5 && d.value<2){return 0.4;}
  else if(d.value>2 && d.value<4){return 0.6;}
  else{return 0.8;}
}
const ColorLegendh = ((
  opacityArr,
 
    tickSpacing = 20,
    tickSize = 10,
    tickTextOffset = 20
    
    ) =>{
      const xcord=(i)=>{

        if(width>800 || width<400){return 0;}
            return (i*(innerWidth/2))%innerWidth;
           }
           
           const ycord=(i)=>{
        
            if(width>800||width<400){return((i)*25);}
        if((i+1)%2){return((i+1)*25);}
        else{return((i)*25);}
            
             }


    return opacityArr.map((ele,i)=>{
        var v=(Object.values(ele)[0]);
        
        var k=Object.keys(ele)[0];
return(
<g key={i} className="tick" transform={`translate(${xcord(i)},${ycord(i)})`} 


    // onMouseEnter={()=>{onHover(domainValue)}}
    // onMouseOut={()=>{onHover(null);}}
    // opacity={hoveredValue && domainValue!==hoveredValue?fadeOpacity:1}
    >
        <circle fill={'#880808'} opacity={v} r={tickSize} />
      <text className="legend-text" key={i} x={tickTextOffset} dy=".32em">
        {'< '+k}
      </text>  
    </g>

) }
      
      )
  
  })
  

 
  
    

  return (
   <>
   
<div className="flex-container">

<div className='svg1' >

         <svg width={width} height={height}>
        <g transform={`translate(${width>400?margin.left:80},${margin.top})`}>

<AxisBottomh xScale={xScaleh} innerHeight={y_elements.length * itemSize}  />

{/* {xScale.ticks().map(tickValue =><g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}><line y2={innerHeight} stroke="black" />
<text style={{textAnchor:'middle'}} dy='0.71em' y={innerHeight+3}>{tickValue}</text>

</g>)} */}

<AxisLeft yScale={yScaleh}/>
<Marksh opacityFunc={opacityh}data={jsondata} colorScale={colorScaleh} xScale={xScaleh} yScale={yScaleh} colorValue={colorValueh} xValue={xValueh} yValue={yValueh} cellSize={cellSize}/> 


{/* <text className='axis-label' x={innerWidth/2} y={innerHeight+xAxisLabelOffset} textAnchor="middle">Population</text>

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
<g opacity={hoveredValue?fadeOpacity:1}>
<Marks data={data} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>
</g>
<Marks data={filteredData} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/> */} 


{/* {data.map((d)=><rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>)} */}

</g>
      </svg>
      </div>
<div className='svg1' >
       <svg width={width>800?width/4:width} height={height} >

         <g transform={`translate(${10},${margin.top})`}> 

        <g className="flex" transform={`translate(${30}, 60)`}>

<text 

// className='axis-label' textAnchor="middle" 

style={{textAnchor:'middle'}} x={50} y={-25} className='axis-label'>{colorLegendLabel}</text>
{ColorLegendh(opacityArr,25,7,20)}
{/* <ColorLegend colorScale={colorScale} tickSpacing={100} tickSize={7} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} innerWidth={innerWidth}/> */}

</g>
     
        </g>
      
     
      </svg>






      </div>
      






      </div>
      <div className="container-fluid bg-primary p-5">
<div className="row">
<div className="col-md-12 col-lg-9 col-xl-9 my-2">


         <svg width={width} height={height}>
        <g transform={`translate(${width>400?margin.left:80},${margin.top})`}>

<AxisBottomh xScale={xScaleh} innerHeight={y_elements.length * itemSize}  />

{/* {xScale.ticks().map(tickValue =><g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}><line y2={innerHeight} stroke="black" />
<text style={{textAnchor:'middle'}} dy='0.71em' y={innerHeight+3}>{tickValue}</text>

</g>)} */}

<AxisLeft yScale={yScaleh}/>
<Marksh opacityFunc={opacityh}data={jsondata} colorScale={colorScaleh} xScale={xScaleh} yScale={yScaleh} colorValue={colorValueh} xValue={xValueh} yValue={yValueh} cellSize={cellSize}/> 


{/* <text className='axis-label' x={innerWidth/2} y={innerHeight+xAxisLabelOffset} textAnchor="middle">Population</text>

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
<g opacity={hoveredValue?fadeOpacity:1}>
<Marks data={data} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/>
</g>
<Marks data={filteredData} colorScale={colorScale} xScale={xScale} yScale={yScale} colorValue={colorValue} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat}/> */} 


{/* {data.map((d)=><rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()}></rect>)} */}

</g>
      </svg>
      

</div>
<div className="col-md-12 col-lg-2 col-xl-2 my-2">

       <svg width={width>800?width/4:width} height={height} >

         <g transform={`translate(${10},${margin.top})`}> 

        <g className="flex" transform={`translate(${30}, 60)`}>

<text 

// className='axis-label' textAnchor="middle" 

style={{textAnchor:'middle'}} x={50} y={-25} className='axis-label'>{colorLegendLabel}</text>
{ColorLegendh(opacityArr,25,7,20)}
{/* <ColorLegend colorScale={colorScale} tickSpacing={100} tickSize={7} tickTextOffset={20} onHover={setHoveredValue} hoveredValue={hoveredValue} fadeOpacity={fadeOpacity} innerWidth={innerWidth}/> */}

</g>
     
        </g>
      
     
      </svg>






      
      
</div>
  </div></div>

      </>
   );
}

export default Heatmap;
