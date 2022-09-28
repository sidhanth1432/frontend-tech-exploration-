
import React from "react";
import {useDrag} from "react-dnd"

const Member=({item,type,index,onDropMember})=>{

const [{isDraggble},dragRef]=useDrag({
type:type,
item:()=>({...item,index}),
end:(item,monitor)=>{
  
    const dropResult=monitor.getDropResult();
    if(dropResult && item){
        onDropMember(item);
    }
},
collect:(monitor)=>({
    isDragging:monitor.isDragging(),

}),

});

return <li className="list-group-item text-center members" ref={dragRef}>
{item.name}


</li>

};

export default Member;