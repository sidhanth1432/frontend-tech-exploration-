import "./App.css"
import React,{useState} from "react";
import Member from "./components/Member";
import {useDrop} from "react-dnd";
import Detail from "./components/Detail";
const DragNDrop=()=> {

const [members,setMember]=useState([
{name:"sid",age:18,gender:"male"},
{name:"sam",age:11,gender:"female"},
{name:"raj",age:12,gender:"male"},
{name:"vijay",age:13,gender:"female"},
{name:"arjun",age:14,gender:"male"},

]);
const [detail,setDetail]=useState([]);

const [{isOver},addToDetailRef]=useDrop({
    accept:"member",
    collect:(monitor)=>({isOver :!!monitor.isOver()}),

});



const moveMemberToDetail=(item)=>{


setDetail(()=>[item]);
}



     return (<div className="container p-5">
        <div className="row">
            <div className="col-6 col-md-4 offset-md-1 shadow inactiveMember">
                <h1 className="text-center heading">Members</h1>
            <ul className="list-group"> 
            {members.map((e,i)=>{
           return <Member key={e.name} item={e} type="member" index={i} onDropMember={moveMemberToDetail} /> 
           })}
               
</ul></div>
            <div ref={addToDetailRef} className={ isOver? "col-6 col-md-4 offset-md-1 shadow activeMember " : "col-6 col-md-4 offset-md-1 shadow inactiveMember " }
            
            >
                <h1 className="text-center text-muted heading ">Details</h1>
            <ul className="list-group">
            {detail.map((e,i)=>{
            return <Detail key={e.name} item={e}/>
            })} 
            </ul> 
                </div>
        </div>
     </div>
     
     

     
     
     );
 }

 export default DragNDrop;