
export const AxisLeft =({yScale}) =>

yScale.domain().map(tickValue =>
<g className="tick" key={tickValue}>

   <text key={tickValue} className="tick-label" style={{textAnchor:'end'}} dy='0.32em' x={-3} y={yScale(tickValue)}>{tickValue}</text>
   
  </g>
  )