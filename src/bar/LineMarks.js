import {line,curveLinear} from 'd3';

import {pointer,select} from 'd3';

export const LineMarks=({data,colorScale,colorValue,xScale,yScale,xValue,yValue,tooltipFormat,circleRadius,hoveredValue,fadeOpacity})=>

<g className="marks">
<path 
fill="none"
stroke="#684664"
strokeWidth="5"
strokeLinejoin="round"
strokeLinecap='round'
opacity="1"
d={line()
.x(d=>xScale(xValue(d)))
.y(d=>yScale(yValue(d)))
.curve(curveLinear)
(data)

}/>


{
data.map((d)=>(
   
<circle 
fill={colorScale(colorValue(d))}
key={yValue(d)} 
cx={xScale(xValue(d))} 
cy={yScale(yValue(d))} 
r={circleRadius}
opacity={hoveredValue && yValue(d)!==hoveredValue?fadeOpacity:1}
// width={xScale(xValue(d))} height={yScale.bandwidth()}

onMouseLeave={(event) => {

   console.log("out");
   var tooltip = select('.tooltip-line_area');
   tooltip.style('opacity', 0);
 }}
onMouseMove={(event)=>{
   console.log(yValue(d));  
   const text = select('.tooltip-line_area__text');

   text.text(`${yValue(d)}`);
   const text2 = select('.tooltip-line_pop__text');

   text2.text('Population:'+tooltipFormat(xValue(d)));
   
   
   
        const [x, y] = pointer(event);
   var tooltip = select('.tooltip-line_area');
   tooltip.attr('transform', `translate(${0}, ${0})`);

}}
onMouseOver={(event) => {
   console.log("in");
   var tooltip = select('.tooltip-line_area');
   tooltip.style('opacity', 1);
 }}

>


   {/* <title>{
   yValue(d)+' Population:'+tooltipFormat(xValue(d))
   
   }</title>  */}


</circle>))
  }
  
  </g>