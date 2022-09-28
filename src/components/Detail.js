
import React from "react";


const Detail=({item})=>{
    return(
    <><li className="list-group-item text-center details">
  Name: {item.name}
    
    
    </li><li className="list-group-item text-center details">
Age: {item.age}


</li><li className="list-group-item text-center details">
Gender: {item.gender}


</li></>);
}

export default Detail;