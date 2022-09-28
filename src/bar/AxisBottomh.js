export const AxisBottomh=({xScale,innerHeight})=>


 xScale.domain().map((value,i) =>
     

 <g className="tick" key={value} transform={`translate(${xScale(value)+xScale.bandwidth()/2},${innerHeight+100})rotate(-90)`}>
    
    
 <text className="tick-label" style={{textAnchor:'start'}} dx='.8em' dy='0.5em' 
 
//  x={xScale(value)} y={innerHeight+3}
 
 >{(value)}</text> 

 </g>

 )