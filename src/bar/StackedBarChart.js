import {scaleLinear,axisBottom, max, scaleBand, select,stack, axisLeft} from "d3";
import React,{useEffect,useRef} from 'react';

// import useResizeObserver from "./useResizeObserver"

function StackedBarChart({data,keys,colors}){
    const svgRef =useRef();

    // const wrapperRef =useRef();


    // const dimensions=useResizeObserver(wrapperRef);


    useEffect(()=>{
        const svg=select(svgRef.current);
       const width=500;
       const height=500;
       

const stackGenerator=stack().keys(keys);
const layers=stackGenerator(data);
const extent =[0,max(layers,layer=>max(layer,sequence=>sequence[1]))];


        const xScale=scaleBand().domain(data.map(d=>d.year))
        .range([0,width]);

        const xAxis=axisBottom(xScale);
        svg.select(".x-axis")
        .attr("transform",`translate(0,${height})`)
        .call(xAxis);

        const yScale=scaleLinear()
        .domain(extent)
        .range([height,0])
       ;

        const yAxis=axisLeft(xScale);
        svg.select(".y-axis").call(yAxis);
        
        // dimensions || wrapperRef.current.getBoundingClientRect();


svg.selectAll(".layer")
.data(layers)
.join("g")
.attr("class","layer")
.selectAll('rect')
.data(layer =>layer)
.join("rect")
.attr("x",sequence=>{
    return xScale(sequence.data.year)
}
)
.attr("width",xScale.bandwidth())
.attr("y",sequence => yScale(sequence[1]))
.attr("height",sequence=>yScale(sequence[0]-yScale(sequence[1])));


    },[colors,data,keys]);

    return(
<>
{/* <div ref={wrapperRef} style={{marginBottom:"2em"}}> */}

<svg ref={svgRef} transform={`translate(100,100)`}>
<g className="x-axis"> </g>
<g className="y-axis"> </g>

</svg>


{/* </div> */}

</>

    );


}

export default StackedBarChart;