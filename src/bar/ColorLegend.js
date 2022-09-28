
// export const ColorLegend = ({
//     colorScale,
//     tickSpacing = 20,
//     tickSize = 10,
//     tickTextOffset = 20
//     ,onHover,
//     hoveredValue,
//     fadeOpacity,
//     innerWidth
//   }) =>{
   




//   return(
//     colorScale.domain().map((domainValue, i) => (
//       <g key={i} className="tick" transform={`translate(${xcord(i,innerWidth)},${ycord(i)})`} 
//       onMouseEnter={()=>{onHover(domainValue)}}
//       onMouseOut={()=>{onHover(null);}}
//       opacity={hoveredValue && domainValue!==hoveredValue?fadeOpacity:1}
//       >
//         <circle key={domainValue} fill={colorScale(domainValue)} r={tickSize} />
        
//         <text className="legend-text" key={i} x={tickTextOffset} dy=".32em">
//           {domainValue}
//         </text>
//       </g>
//     ))
//     );}