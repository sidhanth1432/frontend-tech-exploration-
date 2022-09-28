export 
const Marksh=({opacityFunc,data,colorScale,colorValue,xScale,yScale,xValue,yValue,cellSize})=>
data.map((d,i)=><rect 
fill={colorScale(colorValue(d))}
opacity={opacityFunc(d)}
className="mark" key={i} x={xScale(xValue(d))} y={yScale(yValue(d))} width={cellSize} height={cellSize}>


</rect>)
  