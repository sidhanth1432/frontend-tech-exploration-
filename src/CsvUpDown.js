
import $, { event } from "jquery";
import React,{Component} from "react";
import './App.css'
import {toast} from 'react-toastify';
import { UploadCountryPopulationData } from "./data/api";

 import jqGrid from "free-jqgrid"

import {connect} from "react-redux";
import { userActions } from './store/user-slice';


class CsvUpDown extends Component{
    state={
        count:1,
           selectedValue:"#grid1",
          tableinfo:[]
      };
    componentDidMount=()=>{
    console.log(this.props);
      this.setState({tableinfo:this.props.tablesInfo});
    
    }
      
setTableInfo=(tableData)=>{
  this.props.dispatch(userActions.addTableInfo(tableData));
  
}


      JSONToCSVConvertor=(JSONData, ReportTitle, ShowLabel)=> {
      
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
      
       
     
        if (ShowLabel) {
            var row = "";
           
            for (var index in arrData.items[0]) {
            
                row += index + ',';
            }
           
            row = row.slice(0, -1);
          
         
            CSV += row + '\r\n';
           
        }
 
        for (var i = 0; i < arrData.items.length; i++) {
            var row = "";
        
            for (var index in arrData.items[i]) {
                row += '"' + arrData.items[i][index] + '",';
            }
      
       
            row.slice(0, row.length - 1);
      

            CSV += row + '\r\n';
      
            
            
        }
        if (CSV == '') {
            window.alert("Invalid data");
            return;
        }
        
        var link = document.createElement("a");
        link.id = "lnkDwnldLnk";
    
        document.body.appendChild(link);
        var csv = CSV;
        var blob = new Blob([csv], { type: 'text/csv' });
        
       
          
            var myURL = window.URL || window.webkitURL;
           
            
            var csvUrl = myURL.createObjectURL(blob);
            
            var filename = 'DataName.csv'; 
            $("#lnkDwnldLnk")
                            .attr({
                                'download': filename,
                                'href': csvUrl
                            });
            $('#lnkDwnldLnk')[0].click();
            document.body.removeChild(link);
        
      }
      
      
      
       exportData=(e, grid)=> {

        var gridid = $(grid).getDataIDs(); 
      

        var label = $(grid).getRowData(gridid[0]); 
       
        var mydata = $(grid).jqGrid('getGridParam', 'data');
      
        mydata.map((ele,i)=>{
      
          delete ele.id;
          delete ele._id_;
          return ele;
        })
        
        var obj = new Object();
        obj.count = mydata.length;
        obj.items = new Array();
        for (var i = 0; i < mydata.length; i++) {
          console.log(mydata[i]);
            obj.items.push(mydata[i]);
        }
      
        console.log(obj);
        var json = JSON.stringify(obj);
        this.JSONToCSVConvertor(json, "csv", 1);
      }
      
      
       customsid=(grid,pager,count,tableinfo)=> {
        if(count===1){
        let div = document.createElement('div');
        div.classList.add('sid');
      
        document.body.appendChild(div);
       }
       
        var txt2 = $("<table></table>").attr('id',grid);
        var txt3 = $("<div></div>").attr('id',pager);
        $(".sid").append(txt2,txt3);
        $("#"+grid).jqGrid({  
          url: "http://localhost:8000/api/getDataBasedOnTableName",
          postData:{tablename:tableinfo["filename"]} , 
          datatype: 'json',  
          mtype: 'Get',  
          hoverrows:false,
          colModel:tableinfo["colmodel"],
              pager:
               $('#'+pager)
              
              ,  
              rownumbers: true,
              rowNum: 10,  
          rowList: [5, 10, 20, "10000:All"],
          loadonce: true,
          height: '100%',  
          viewrecords: true,  
       
          emptyrecords: 'No Records are Available to Display'
          
          ,
      
          caption:"Table"+count,
          jsonReader: {  
              root: "rows",  
              page: "page",  
              total: "total",  
              records: "records",  
              repeatitems: false,  
              Id: "0"  
          
          
            }
            
            , 
            
            guiStyle:"bootstrap4",
            iconSet: "fontAwesome",
            gridComplete: function () {
             
      $("table#"+grid).addClass("table-striped bg-warning"); 
      }
            
            
            , 
          autowidth: true,  
          multiselect: false 
      });  
      
      
      
      
      
      
      $(".ui-jqgrid-titlebar-close").hide();
      
      
      }
       mapStateToProps=(state)=> {
        return {
          
          todos: state.todos,
          filter: state.visibilityFilter,
        }
      }
      






    render(){




    const dropdown=()=>{
    
    
        return(<select className="form-control mb-3" onChange={event => this.setState({selectedValue:(event.target.value)})}>
        {
        this.state.tableinfo &&
        this.state.tableinfo.map((ele,i) => {
          var j=parseInt(i)+1;
         return( <option key={"#grid"+j} value={"#grid"+j}
           
          selected={"#grid"+j === this.state.selectedValue   }
           
           >
            {"Table "+j}
          </option>) })}
        </select>
        )


        
        
        }
        
     
    
      const handleSubmit=(e)=>{
        
        e.preventDefault();
        
       
        try{
    
      
          UploadCountryPopulationData(this.state.countryData.file).then(
              (res) =>{
    
              res.data.isError?toast.error(res.data.Error):toast.success(res.data.success);
            
            
              console.log(this.state.count);
              if(!res.data.isError){
                this.customsid("grid"+this.state.count,"pager"+this.state.count,this.state.count,res.data["tableinfo"]);
                this.setState({countryData:"",count:this.state.count+1,tableinfo:[...this.state.tableinfo,res.data["tableinfo"]]
                
                
                }
              
               );
               this.setTableInfo(res.data["tableinfo"]);
              
       
            }
         
            })
              
      } catch (error){
      
        
      toast.error(error.message);
      }
      }
      const FileChange=(e)=>{
        this.setState({countryData:{file:e.target.files[0]}});
       
      }
    
    return (
    <>
    <div className="p-5">
    
    
    <div className="row">
      <div className="col-md-6 offset-md-3 shadow">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h4>Data</h4>
    
    <input className="form-control-file my-2" type="file" name="profile_picture" onChange={(e) => {
     
      FileChange(e);
      // setFile(e.target.files[0]);console.log(file);
      
      }} autoFocus />
    
    
    <div className="mb-2 text-center">
     <button type="submit" className="btn btn-primary mt-3">Upload</button>
     
     </div></form>
    
    
     <div className="py-2">
    {dropdown()}
     
    </div>
    <div className="mb-2 text-center">
     <button className="btn btn-primary mt-3" onClick={(e)=>{this.exportData(e,this.state.selectedValue)}}>Download</button>
     
     </div>
     
    
    
      </div>
      </div>
      
    
    
    
    </div>

    
    </>
    
    );}
    
}


const mapStateToProps=(state)=>{

  console.log(state);
  return {tablesInfo:state.user.tableinfo}
}
    export default connect(mapStateToProps)(CsvUpDown);
    
       