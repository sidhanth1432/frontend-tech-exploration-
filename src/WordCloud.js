import { useEffect,useState } from 'react';
import './App.css';
import * as d3 from "d3"
import cloud from "d3-cloud"
import {getWords} from './data/api'
// import axios from 'axios'


function WordCloud() {
    const w=window.innerWidth<960?window.innerWidth:500;
  const[width,setWidth]=useState(w);
  
  const[height,setHeight]=useState(500);
const [data,setData]=useState([]); 

 
const color =d3.scaleOrdinal().range(d3.schemeSet2);

// const getWords = async () => {
//   console.log("im called");
//   return await axios.get("http://localhost:8000/api/words");

// }  
  useEffect(()=>{
    function handleResize() {
        if(window.innerWidth<960){
        setWidth(window.innerWidth);}
        else{setWidth(960);}
      if(window.innerHeight<500){
        setHeight(window.innerHeight);}
        else{setHeight(500);}
      
      
      
      }
      
      window.addEventListener('resize', handleResize);



    getWords().then((res) => {
      var word=res.data;
var maxpopcountry= (word.reduce(function(max,curr){
 
  if(max<curr.popcount){max=curr.popcount;}return max;
},1))
  



word=word.map((d)=>{return {value:d.value,popcount:width>800?((d.popcount/maxpopcountry)*100)+30:((d.popcount/maxpopcountry)*100)<50?((d.popcount/maxpopcountry)*100)+20:((d.popcount/maxpopcountry)*100)};})
console.log(word);

      var layout = cloud()
      .size([width<500?300:500, 500])
      .words(
         word
        
        .map(function(d) {
        return {text: d.value, size:(d.popcount)};
      }))
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);
  
  layout.start();
  


    });

function draw(words) {
  
  setData(words);
    
    }

  },[width])    
  

  



  return (

<div className="flex-container">
      <div className='svg1'> 

<svg width={width} height={height}>
    <g transform={`translate(${width>400?(width/4)+90:(width/4)+30},${height/2})`}>
      {data.map((d,i)=>{
      return <text key={d.x} style={{textAnchor:'middle',fontSize:d.size+`px`,fontFamily:'Impact',fill:color(d.x)}} transform={`translate(` + [d.x, d.y] + `)rotate(` + d.rotate + `)`}>{d.text}</text>

      })}
      
    </g>
  </svg>
  </div></div>
    );
}

export default WordCloud;

