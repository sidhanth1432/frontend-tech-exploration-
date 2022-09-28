import {pointer,select} from 'd3';

export const PieMarks=({data,colorScale,colorValue,xScale,yScale,xValue,yValue,tooltipFormat,circleRadius,hoveredValue,fadeOpacity,arcGenerator})=>

<>

{/* 
<path 
fill="none"
stroke="#684664"
strokeWidth="5"
strokeLinejoin="round"
strokeLinecap='round'
opacity="1"
d={pie()
.value(xValue)
(data)
.join



}/> */}


{
data.map((d,i)=>(
   <g key={i}>
    <path d={arcGenerator(d)} fill={colorScale(d.data.value)}
    onMouseLeave={(event, d) => {
      console.log("out");
      var tooltip = select('.tooltip-pie_area');
      tooltip.style('opacity', 0);
    }}
   onMouseMove={(event)=>{
console.log(d);

      const text = select('.tooltip-pie_area__text');
   
      text.text(`${d.data.value}`);
      const text2 = select('.tooltip-pie_pop__text');
   
      text2.text('Population:'+tooltipFormat(d.data.popcount));
      
      
      
           const [x, y] = pointer(event);
      var tooltip = select('.tooltip-pie_area');
      tooltip.attr('transform', `translate(${0}, ${0})`);
   
   }}
   onMouseOver={(event, d) => {
      console.log("in");
      var tooltip = select('.tooltip-pie_area');
      tooltip.style('opacity', 1);
    }}
    
    
    >
      
      
      <title>{d.data.Country+' Population:'+tooltipFormat(d.data.popcount)}</title>
      </path>
   </g>
    // <path
    // d={pie()
    //     .value(d=>xScale(xValue(d)))
    //             (data)
    //             .arcGenerator
        
    //     } />
// <circle 
// fill={colorScale(colorValue(d))}
// key={yValue(d)} 
// cx={xScale(xValue(d))} 
// cy={yScale(yValue(d))} 
// r={circleRadius}
// opacity={hoveredValue && yScale(yValue(d))!==hoveredValue?fadeOpacity:1}
// // width={xScale(xValue(d))} height={yScale.bandwidth()}


// >


//    <title>{
//    yValue(d)+' Population:'+tooltipFormat(xValue(d))
   
//    }</title> 
// </circle>

))
  }</>