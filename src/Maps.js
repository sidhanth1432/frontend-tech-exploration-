// import React from 'react';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
//  import OSM from 'ol/source/OSM';
// import $, { map } from "jquery";
// import Stamen from 'ol/source/Stamen';
// import 'ol/ol.css';
// import './App.css';
// import {defaults} from 'ol/control';
// import TileWMS from 'ol/source/TileWMS';
// import ImageWMS from 'ol/source/ImageWMS';
// import Overlay,{getElementById} from 'ol/Overlay';
// import ImageLayer from 'ol/layer/Image';
// import {Circle, Fill, Stroke, Style} from 'ol/style';
// import GeoJSON from 'ol/format/GeoJSON';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import LineString from 'ol/geom/LineString';
// import Feature from 'ol/Feature';
// import {transform} from 'ol/proj';
// import Point from 'ol/geom/Point';
// import Icon from 'ol/style/Icon';
// import img from './img/hos3.png' 
// import img1 from './img/download1.png' 
// import {getGeodata} from './data/api'


// export default class Maps extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
      
//           center: [0, 0],
//           zoom: 0,
//       };
//     }
   
//     componentDidMount() {
      
// const get_GeoData =async () =>{
//   try{
//       const geoData= await getGeodata();
      
      
//       this.setState({towerPoint:geoData.data['towerRes'],points:geoData.data['towerConnect']})
      
//       // towerPoint=geoData.data['towerRes'];
//       // points=geoData.data['towerConnect'];
  
//     }
//   catch(error){console.log(error.message);}
  
//   }
//   get_GeoData();}
//   componentDidUpdate(){
//     var towerPoint=this.state.towerPoint;
//       var points=this.state.points;
//       console.log(points);
//         const wmsSource = new ImageWMS({
//             url: 'http://localhost:8080/geoserver/dummy/wms',
//             params: {'LAYERS': 'dummy:populated_places'},
            
             
//             serverType: 'geoserver',
//           });
         

//           // const updateLegend = function (resolution) {
//           //   console.log(resolution);
//           //   var graphicUrl = wmsSource.getLegendUrl(resolution);
//           //   graphicUrl=graphicUrl+'&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:14;bgColor:0xFFFFFF;dpi:180';
//           //   const img = document.getElementById('legend');
//           //   console.log(graphicUrl);
//           //   img.src = graphicUrl;
//           // };




//         const container = document.getElementById('popup');
//         const content = document.getElementById('popup-content');
        

//         var popup = new Overlay({ element: container,
//             autoPan: {
//               animation: {
//                 duration: 250,
//               },
//             },
//           });

   
          
// var imageLayer=new ImageLayer({
//     source: wmsSource
//   });


// var baseLayer=new TileLayer({
                   
//     source:new OSM({

        

//         // layer:'watercolor'
            
        
//     }),


// });
// var featureLayersource=new TileWMS({
//     url:"http://localhost:8080/geoserver/dummy/wms",
//     params:{'LAYERS':"dummy:populated_places",'TILED':true},
//     serverType:'geoserver',
//     transition:0

// });

// var featureLayer= new TileLayer({
//     source: featureLayersource

//  });

// //  const fill = new Fill({
// //   color: 'rgba(255,255,255,0.4)',
// // });
// // const stroke = new Stroke({
// //   color: '#3399CC',
// //   width: 1.25,
// // });
// // const styles = new Style({
// //     image: new Circle({
// //       fill: fill,
// //       stroke: stroke,
// //       radius: 5,
// //     }),
// //     fill: fill,
// //     stroke: stroke,
// //   });

//   var vectorSource=new VectorSource({
//     url:'http://localhost:8080/geoserver/dummy/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dummy%3Apopulated_places&outputFormat=application%2Fjson',
//     format:new GeoJSON()

//   });

// // var towerPoint=[{
// //   "src":[72.855043,19.018936],
// //   "name":"Mumbai",
// //   "pop_max":1000
// // },
// // {
// //   "src":[77.558064,12.971941],
// //   "name":"Bangalore",
// //   "pop_max":1000
// // }];
  


// // var points=[{"src":[72.855043,19.018936],
// // "dest":[77.558064,12.971941],
// // "type":"M to B"},
// // {"src":[77.19998,28.600023],
// //   "dest":[88.32273,22.496915],
// //   "type":"D to K"}
// //   ,
// //   {"src":[73.164689,33.701942],
// //     "dest":[85.314696,27.718638],
// //     "type":"I to K"}
  
// // ];


// var vectorLine = new VectorSource({});
//   var vectorTower = new VectorSource({});
//   for (var i = 0; i < towerPoint.length; i++) {
//     towerPoint[i]["src"] = transform(towerPoint[i]["src"], 'EPSG:4326', 'EPSG:3857');
    
// var temp1={};
// temp1.geometry=new Point(towerPoint[i]["src"]);
// temp1.name=towerPoint[i]["name"];
// temp1.pop_max=towerPoint[i]["pop_max"];
// var featureTower = new Feature(temp1);
    
// vectorTower.addFeature(featureTower);


// }
//   for (var i = 0; i < points.length; i++) {
//     points[i]["src"] = transform(points[i]["src"], 'EPSG:4326', 'EPSG:3857');
//     points[i]["dest"] = transform(points[i]["dest"], 'EPSG:4326', 'EPSG:3857');
//     var temp=[];
//     temp.push(points[i]["src"]);
//     temp.push(points[i]["dest"]);
    
// points[i]["total"]=temp;
// var temp1={};
// temp1.geometry=new LineString(points[i]["total"]);
// temp1.name="lineinfo";
// temp1.type=points[i]["type"];
// var featureLine = new Feature(temp1);
    
// vectorLine.addFeature(featureLine);


// }


//   // var featureLine = new Feature(featureArray
    
//   // //   {
//   // //   geometry: featureArray
    
//   // //   // new LineString(points),name:"lineinfo",type:"Mumbai to Bangalore"
  
//   // // }
  
//   // );

    
    

//     // vectorLine.addFeature(featureArray);
    
//     var styleFunction = function(feature, resolution) {
//       var geometry = feature.getGeometry();
//       var styles = [
//         // linestring
//         new Style({
//           stroke: new Stroke({
//             color: '#ffcc33',
//             width: 2
//           })
//         })
//       ];
    
//       geometry.forEachSegment(function(start, end) {
//         var dx = end[0] - start[0];
//         var dy = end[1] - start[1];
//         var rotation = Math.atan2(dy, dx);
//         var point=[(end[0]+start[0])/2,(end[1]+start[1])/2]
//         // arrows
//         styles.push(new Style({
//           geometry: new Point(point),
//           image: new Icon({
//             src: img1,
//             anchor: [0.75, 0.5],
//             rotateWithView: false,
//             rotation: -rotation
//           })
//         }));
//       });
    
//       return styles;
//     };
// var vectorLineLayer = new VectorLayer({
//   source: vectorLine,
//   style:styleFunction
   
//   // new Style({
//   //     fill: new Fill({ color: '#000000', weight: 4 }),
//   //     stroke: new Stroke({ color: '#00FF00', width: 2
      
    
//   //   })
//   // })


// });



// console.log(vectorLineLayer);

// const getStyle=function(feature,resolution){
// //   var max=22602915;
// //   var diff=max/7;
  
// //   const fill = new Fill({
// //     color: 'rgba(255,255,0,0.5)',
// //   });
// //   console.log(feature.get('pop_max'));
// // for(var i=0;i<7;i++){
// // if(feature.get('pop_max')>=(i*diff) && feature.get('pop_max')<=((i+1)*diff)){
//   return new Style({
//     image: new Icon({
//       anchor:[0.5,1],
//       anchorXUnits:'fraction',
//       anchorYunits:'pixels',
//       src:img,
//     } )
  
//   });
// // }

// // }


  
//   // return styles

// }

//   var vectorLayer=new VectorLayer({
//     title:'populated places',
//     source:vectorTower,
    
//     style:function(feature,resolution){
   
//       return getStyle(feature,resolution);
//     }
    
//   });
      
//        const map= new Map({
        
//           target: "map-container",
//         // overlays: [popup],
//             layers: [baseLayer,vectorLayer,vectorLineLayer
              
//               // ,featureLayer,imageLayer
                
               
//             ],
//             controls:defaults({
//                 attribution: false,


//             }),
           
//             view: new View({
//                 center: [9162325.980782526, 2328836.3004929526],
//                 zoom: 5,
//             }),
//         });

// // map.on('click',function(e){

   
// // var resolution=map.getView().getResolution();
// // var coord=e.coordinate;
// // var projection=map.getView().getProjection();
// // var url=featureLayersource.getFeatureInfoUrl(coord,resolution,projection,
// //     {'INFO_FORMAT':'application/json',}
// //     )


// // if(url){
// //     $.getJSON(url,function(data){
// //         if(data.numberReturned){
// //             $('.ol-popup').show();
// //             var temp=data.features[0].properties;
            
// //         content.innerHTML='<div><b>Name: </b>'+temp['name']+'</div><p><b>Population: </b>'+temp['pop_max']+'</p>';
// //         popup.setPosition(coord);
// //          map.addOverlay(popup)
// //     }
// //     })
// // }

// // })


// // // Initial legend
// // const resolution = map.getView().getResolution();
// // updateLegend(resolution);

// // // Update the legend when the resolution changes
// // map.getView().on('change:resolution', function (event) {
// //   console.log(map.getView().getCenter());
// //   console.log(map.getView().getZoom());
// //   const resolution = event.target.getResolution();
// //   updateLegend(resolution);
// // });

// // commentedhere

// map.on('click', function(e){
//   var feature = map.forEachFeatureAtPixel(e.pixel,
//     function(feature, layer) {
      
//         return feature;
//     });
//     console.log(feature.get('name'));
// if (feature.get('name')!=='lineinfo') {

//     var geometry = feature.getGeometry();

//     var coord = geometry.getCoordinates();
//     console.log(coord);
//     // console.log(coord);
//     // var coordinate = e.coordinate;
//     // console.log(coordinate);
//     $('.ol-popup').show();

//              content.innerHTML='<div><b>Name: </b>'+feature.get('name')+'</div><p><b>Population: </b>'+feature.get('pop_max')+'</p>';
//              popup.setPosition(coord);
//               map.addOverlay(popup);


//   }else{
//     var geometry = feature.getGeometry();

//     var coord = [];
//     coord.push((geometry.getCoordinates()[0][0]+geometry.getCoordinates()[1][0])/2);
//     coord.push((geometry.getCoordinates()[0][1]+geometry.getCoordinates()[1][1])/2);

//     console.log(coord);
//     // console.log(coord);
//     // var coordinate = e.coordinate;
//     // console.log(coordinate);
//     $('.ol-popup').show();
    
//              content.innerHTML='<div><b>Type: </b>'+feature.get('type')+'</div>';
//              popup.setPosition(coord);
//               map.addOverlay(popup);

//   }
  
 
  
// });

//     }
//     componentWillUnmount() {
    
//    }
//      closerFunc=()=>{
//       console.log("im clicked");
//       $('.ol-popup').hide();
//   }
//     render() {
       
//         return (
//       <React.Fragment>
//       <div className='p-5'>
//       <div className='row'>
//           <div id="map-container" className="map-container col-md-10"></div>
//           <div className='col-md-2'>
            
//             <div className='row'>
//               <div className='col-4'>
//               <img src={img}/>
//               </div>
//               <div className='col-4'>
//               <h4>Tower</h4>
//               </div>
              
//             </div>
//             </div>
//           </div>
//           </div>
//        <div id="popup" className="ol-popup">
//        <div onClick={this.closerFunc} id="popup-closer" className="ol-popup-closer"></div>
//       <div id="popup-content"></div>
//     </div>
//        </React.Fragment>  
//         );
//     }
// }



// import React, { useState, useEffect, useRef } from 'react';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import 'ol/ol.css';

// function Maps() {
//     const [map, setMap] = useState();
//     const mapElement = useRef();
//     const mapRef = useRef();
//     mapRef.current = map;

//     useEffect(() => {
//         const initialMap = new Map({
//           target: mapElement.current,
//             layers: [
//                 new TileLayer({
//                     source: new OSM(),
//                 }),
//             ],
//             view: new View({
//                 center: [0, 0],
//                 zoom: 0,
//             }),
//         });
//         setMap(initialMap);
//     }, []);

//     return (
//       <div style={{height:'100vh',width:'100%'}} ref={mapElement} className="map-container" />
//     );
// }

// export default Maps;





import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import './App.css'
import img from './img/hos3.png' 
import img1 from './img/download1.png' 
import $ from "jquery";
import { getGeodata } from './data/api';
import Feature from 'ol/Feature';
import {transform} from 'ol/proj';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';

import {defaults} from 'ol/control';
import {Stroke, Style} from 'ol/style';
import Icon from 'ol/style/Icon';
import LineString from 'ol/geom/LineString';
import VectorSource from 'ol/source/Vector';

import VectorLayer from 'ol/layer/Vector';
function Maps() {
    const [map, setMap] = useState();
    
    // const [towerPoint, settowerPoint] = useState();
    
    // const [points, setpoints] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    
    
    useEffect(() => {

      getGeodata().then((res)=>{

// settowerPoint(res.data['towerRes']);
// setpoints(res.data['towerConnect']);
var towerPoint=res.data['towerRes'];
var points=res.data['towerConnect'];
console.log(res.data['towerRes']);
console.log(res.data['towerConnect']);



const container = document.getElementById('popup');
const content = document.getElementById('popup-content');


var popup = new Overlay({ element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });


  var baseLayer=new TileLayer({
                   
    source:new OSM({

        

        // layer:'watercolor'
            
        
    }),


});



var vectorLine = new VectorSource({});
  var vectorTower = new VectorSource({});
  for (var i = 0; i < towerPoint.length; i++) {
    towerPoint[i]["src"] = transform(towerPoint[i]["src"], 'EPSG:4326', 'EPSG:3857');
    
var temp1={};
temp1.geometry=new Point(towerPoint[i]["src"]);
temp1.name=towerPoint[i]["name"];
temp1.pop_max=towerPoint[i]["pop_max"];
var featureTower = new Feature(temp1);
    
vectorTower.addFeature(featureTower);


}



for (var i = 0; i < points.length; i++) {
  points[i]["src"] = transform(points[i]["src"], 'EPSG:4326', 'EPSG:3857');
  points[i]["dest"] = transform(points[i]["dest"], 'EPSG:4326', 'EPSG:3857');
  var temp=[];
  temp.push(points[i]["src"]);
  temp.push(points[i]["dest"]);
  
points[i]["total"]=temp;
var temp1={};
temp1.geometry=new LineString(points[i]["total"]);
temp1.name="lineinfo";
temp1.type=points[i]["type"];
var featureLine = new Feature(temp1);
  
vectorLine.addFeature(featureLine);


}




var styleFunction = function(feature, resolution) {
  var geometry = feature.getGeometry();
  var styles = [
    // linestring
    new Style({
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      })
    })
  ];

  geometry.forEachSegment(function(start, end) {
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    var rotation = Math.atan2(dy, dx);
    var point=[(end[0]+start[0])/2,(end[1]+start[1])/2]
    // arrows
    styles.push(new Style({
      geometry: new Point(point),
      image: new Icon({
        src: img1,
        anchor: [0.75, 0.5],
        rotateWithView: false,
        rotation: -rotation
      })
    }));
  });

  return styles;
};




var vectorLineLayer = new VectorLayer({
  source: vectorLine,
  style:styleFunction
   


});



const getStyle=function(feature,resolution){

  return new Style({
    image: new Icon({
      anchor:[0.5,1],
      anchorXUnits:'fraction',
      anchorYunits:'pixels',
      src:img,
    } )
  
  });
// }

// }


  
  // return styles

}



var vectorLayer=new VectorLayer({
  title:'populated places',
  source:vectorTower,
  
  style:function(feature,resolution){
 
    return getStyle(feature,resolution);
  }
  
});


const map= new Map({
        
  target:mapElement.current,
// overlays: [popup],
    layers: [baseLayer,vectorLayer,vectorLineLayer
      
      // ,featureLayer,imageLayer
        
       
    ],
    controls:defaults({
        attribution: false,


    }),
   
    view: new View({
        center: [9162325.980782526, 2328836.3004929526],
        zoom: 5,
    }),
});


// const initialMap = new Map({
//   target: mapElement.current,
//     layers: [
//         new TileLayer({
//             source: new OSM(),
//         }),
//     ],
//     view: new View({
//         center: [0, 0],
//         zoom: 0,
//     }),
// });

map.on('click', function(e){
  var feature = map.forEachFeatureAtPixel(e.pixel,
    function(feature, layer) {
      
        return feature;
    });
    console.log(feature.get('name'));
if (feature.get('name')!=='lineinfo') {

    var geometry = feature.getGeometry();

    var coord = geometry.getCoordinates();
    console.log(coord);
    // console.log(coord);
    // var coordinate = e.coordinate;
    // console.log(coordinate);
    $('.ol-popup').show();

             content.innerHTML='<div><b>Name: </b>'+feature.get('name')+'</div><p><b>Population: </b>'+feature.get('pop_max')+'</p>';
             popup.setPosition(coord);
              map.addOverlay(popup);


  }else{
    var geometry = feature.getGeometry();

    var coord = [];
    coord.push((geometry.getCoordinates()[0][0]+geometry.getCoordinates()[1][0])/2);
    coord.push((geometry.getCoordinates()[0][1]+geometry.getCoordinates()[1][1])/2);

    console.log(coord);
    // console.log(coord);
    // var coordinate = e.coordinate;
    // console.log(coordinate);
    $('.ol-popup').show();
    
             content.innerHTML='<div><b>Type: </b>'+feature.get('type')+'</div>';
             popup.setPosition(coord);
              map.addOverlay(popup);

  }
  
 
  
});

setMap(map);






      });




    }, []);

    
    const closerFunc=()=>{
        console.log("im clicked");
        $('.ol-popup').hide();
    }

    return (
      <>
      <div className='p-5'>
      <div className='row'>
          <div ref={mapElement} className="map-container col-md-10"></div>
          <div className='col-md-2'>
            
            <div className='row'>
              <div className='col-4'>
              <img src={img}/>
              </div>
              <div className='col-4'>
              <h4>Tower</h4>
              </div>
              
            </div>
            </div>
          </div>
          
       <div id="popup" className="ol-popup">
       <div onClick={closerFunc} id="popup-closer" className="ol-popup-closer"></div>
      <div id="popup-content"></div>
    </div> 
    </div>
       </>
    );
}

export default Maps;