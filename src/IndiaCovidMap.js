
import {Stroke,Fill} from 'ol/style';
import './App.css';
import React,{useState,useEffect,useRef} from 'react';

import GeoJSON from 'ol/format/GeoJSON';
import { Map, View } from 'ol';
import {india} from './india_covid_cases'
import VectorSource from 'ol/source/Vector';

import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import TileLayer from 'ol/layer/Tile';

import {defaults} from 'ol/control';
import Style from 'ol/style/Style';

function IndiaCovidMap() {
    const [map, setMap] = useState();
    const[dateData,setDateData]=useState(['01-01-2021','06-05-2021','09-05-2021','13-05-2021']);
    var [count, setCount] = useState(0);
    // const [latestDate, setlatestDate] = useState('01-01-2021');
    // const [towerPoint, settowerPoint] = useState();
    
    // const [points, setpoints] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

  useEffect(()=>{

    var baseLayer=new TileLayer({
                   
        source:new OSM({
        })
    
    
    });

const getStyle2 = function (feature, resolution) {

        var color = [[254, 217, 118, 0.7], [254, 178, 76, 0.7], [253, 141, 60, 0.7], [252, 78, 42, 0.7], [227, 26, 28, 0.7], [189, 0, 38, 0.7], [128, 0, 38, 1] ];
    var max  = 3000000;
     var diff = max/7;
      
      
  
      if (feature.get(dateData[count]) > max)  {
       
          return new Style({
              fill: new Fill({
                  color: [128, 0, 38, 0.7] // semi-transparent red
              }),
        stroke: new Stroke({
              color: 'white',
              lineDash: [4],
              width: 3
               })
          });
      }
      
  for (var i = 0; i < 7; i++) {
   if (feature.get(dateData[count]) > (i*diff) && feature.get(dateData[count]) <= ((i+1)*diff) ) {
       
         return new Style({
              fill: new Fill({
                  color: color[i] // semi-transparent red
              }),
        stroke: new Stroke({
              color: 'white',
              lineDash: [4],
              width: 3
               })
          });
      }
    
     
    
  };
  
  
        // return new Style({
        //     stroke: new Stroke({
        //       color: '#ffcc33',
        //       width: 1,
        //     }),
        //     fill: new Fill({
        //       color: '#ffcc33',
        //     }),
        //   })


        //   var max=22602915;
        //   var diff=max/7;
          
        //   const fill = new Fill({
        //     color: 'rgba(255,255,0,0.5)',
        //   });
        //   console.log(feature.get('pop_max'));
        // for(var i=0;i<7;i++){
        // if(feature.get('pop_max')>=(i*diff) && feature.get('pop_max')<=((i+1)*diff)){
        //   return new Style({
        //     image: new Circle({
        //       fill: fill,
              
        //       radius: 5*(i+1),
        //     }),
          
        //   });


        // }
        
        // }
      };

console.log(new GeoJSON().readFeatures(india));
var vectorSrc = new VectorSource({
    features: new GeoJSON().readFeatures(india),
});
    var vectorLayer = new VectorLayer({
        source: vectorSrc,
        style: getStyle2
         
      
      
      });
    
            
const map= new Map({
        
    target:mapElement.current,
  // overlays: [popup],
      layers: [baseLayer,vectorLayer
        
        // ,featureLayer,imageLayer
          
         
      ],
      controls:defaults({
          attribution: false,
  
  
      }),
     
      view: new View({
        projection:'EPSG:4326',
          center: [72.25358824646699, 27.877744287906083],
          zoom: 3,
      }),
  });


//   function d(count){
//     console.log(count);
// //    if(count<5){
// //     setCount(count=>count+1);
    
// //  vectorSrc = new VectorSource({
// //     features: new GeoJSON().readFeatures(india),
// // });
// // console.log(vectorSrc);
// // vectorLayer = new VectorLayer({
// //     source: vectorSrc,
// //     style: getStyle2
     
  
  
// //   });

// //   map.addLayer(vectorLayer);

// // }

// // the new style
// // var style;
// // vectorLayer.getSource().forEachFeature(function(feature){

// //   console.log(feature.getProperties());

// //   style = new Style({
// //     fill: new Fill({
// //         color: '#fff' // semi-transparent red
// //     }),
// // stroke: new Stroke({
// //     color: 'white',
// //     lineDash: [4],
// //     width: 3
// //      })
// // });

// //   feature.setStyle(style);
// // });


//   }
// setInterval(d,5000);

//  const interval = setInterval(() => {



//  }, 1000);


// clearInterval(interval);
function covidDateChange(date1) {

  document.getElementById("popup").innerHTML = "<h3>"+date1+"</h3>";
  console.log(map.getView().getCenter());
  console.log(map.getView().getZoom());
  var style;

  vectorLayer.getSource().forEachFeature(function(feature){

    
    var color = [[254, 217, 118, 0.7], [254, 178, 76, 0.7], [253, 141, 60, 0.7], [252, 78, 42, 0.7], [227, 26, 28, 0.7], [189, 0, 38, 0.7], [128, 0, 38, 1] ];
    var max  = 3000000;
     var diff = max/7;
      
      
  
      if (feature.get(date1) > max)  {
       
          style= new Style({
              fill: new Fill({
                  color: [128, 0, 38, 0.7] // semi-transparent red
              }),
        stroke: new Stroke({
              color: 'white',
              lineDash: [4],
              width: 3
               })
          });
      }
      
  for (var i = 0; i < 7; i++) {
   if (feature.get(date1) > (i*diff) && feature.get(date1) <= ((i+1)*diff) ) {
       
    style= new Style({
              fill: new Fill({
                  color: color[i] // semi-transparent red
              }),
        stroke: new Stroke({
              color: 'white',
              lineDash: [4],
              width: 3
               })
          });
      }
    
     
    
  };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // console.log(feature.getProperties());
    


    //    style = new Style({
    //      fill: new Fill({
    //          color: '#fff' // semi-transparent red
    //      }),
    //  stroke: new Stroke({
    //      color: 'white',
    //      lineDash: [4],
    //      width: 3
    //       })
    //  });
    
    //    feature.setStyle(style);
    //  });

    feature.setStyle(style);
    
  })
    
    
}  
var timer;
dateData.map((ele,i)=>{
  
   timer=setTimeout(covidDateChange, i*5000,ele);
   
  return ele;
})



  


return () => {clearTimeout(timer);
console.log('hii');
}

         },[]);

  return (
    <div className='p-5'>
      <div className='row'>
          <div ref={mapElement} className="map-container col-md-10"></div>
          <div className='col-md-2' id='popup'></div>
          </div>
          </div>
  );
}

export default IndiaCovidMap;
