import {pointer,select} from 'd3';


export const Marks=({data,colorScale,colorValue,xScale,yScale,xValue,yValue,tooltipFormat,yAxisAttributeFunc,updateLevelFunc,level})=>
data.map((d)=>
<g key={yValue(d)}>

<rect 
fill={colorScale(colorValue(d))}
className="mark" key={yValue(d)} x={0} y={yScale(yValue(d))} width={xScale(xValue(d))} height={yScale.bandwidth()}

onClick={function(event){
   if(level===0){updateLevelFunc(1);yAxisAttributeFunc(`${yValue(d)}`);}
   
   // else{updateLevelFunc(0);yAxisAttributeFunc('country');}
   
}}
onMouseLeave={(event) => {

   console.log("out");
   var tooltip = select('.tooltip-bar_area');
   tooltip.style('opacity', 0);
 }}
onMouseMove={(event)=>{
  console.log(`${yValue}`);
   const text = select('.tooltip-bar_area__text');

   text.text(`${yValue(d)}`);
   const text2 = select('.tooltip-bar_pop__text');

   text2.text('Population:'+tooltipFormat(xValue(d)));
   
   
   
        const [x, y] = pointer(event);
   var tooltip = select('.tooltip-bar_area');
   tooltip.attr('transform', `translate(${xScale(xValue(d))}, ${yScale(yValue(d))+yScale.bandwidth()/2})`);

}}
onMouseOver={(event) => {
   console.log(d);
   console.log("in");
   var tooltip = select('.tooltip-bar_area');
   tooltip.style('opacity', 1);
 }}

//  onTouchEnd={(event, d) => {
//    console.log("out");
//    var tooltip = select('.tooltip-bar_area');
//    tooltip.style('opacity', 0);
//  }}
// onTouchMove={(event)=>{
//    const text = select('.tooltip-bar_area__text');

//    text.text(`${yValue(d)}`);
//    const text2 = select('.tooltip-bar_pop__text');

//    text2.text('Population:'+tooltipFormat(xValue(d)));
   
   
   
//         const [x, y] = pointer(event);
//    var tooltip = select('.tooltip-bar_area');
//    tooltip.attr('transform', `translate(${xScale(xValue(d))}, ${yScale(yValue(d))+yScale.bandwidth()/2})`);

// }}
// onTouchStart={(event, d) => {
//    console.log("in");
//    var tooltip = select('.tooltip-bar_area');
//    tooltip.style('opacity', 1);
//  }}

// onMouseOver={(event, d) => {
//    var tooltip = select('.tooltip-area').style("opacity", 1);
//  }

// }
>

{/* <span className="tooltiptext">Tooltip text</span>
 
   <title className="markTitle">{
   yValue(d)+' \nPopulation:'+tooltipFormat(xValue(d))
   
   }</title>    */}

   </rect>

{/* <g className="tooltip-area">
          <text className="tooltip-area__text"></text>
        </g> */}

</g>


)
  