import $, { event } from "jquery";
import React,{Component} from "react";
import './App.css'


 import jqGrid from "free-jqgrid"


class CountryPopJqgrid extends Component{


    constructor(){
  
      super();
      this.state={
    }
  }
  
componentDidMount = () => {
    


    $("#grid1").jqGrid({  
        url: "http://localhost:8000/api/jqgridPopulation",  
        datatype: 'json',  
        mtype: 'Get',  
        hoverrows:false,
    
        colNames: ['Country', 'Population','Description',''],  
        colModel: [{ name: "Country",index:"Country",sortable:false,align:"center",
        search:true,id:"sid",
        searchoptions: { sopt: ['eq', 'ne', 'bw', 'bn', 'ew', 'en'] },
        editable:true,
        formoptions:{rowpos:window.innerWidth>400?1:1, colpos:window.innerWidth>400?1:1},
         editoptions:{
          
          // custom_element: myelem, custom_value:myvalue,
          
          dataEvents: [
          { type: 'keyup', fn: function(e) {
            
            // console.log(String(`${e.target.value}`).match(/^[a-zA-Z ]*$/));
          var temp=String($('input#Country').val()).match(/^[a-zA-Z ]*$/);
          console.log(temp);
          
           if(temp){$('input#Country').val(e.target.value);}
           else{
            
            var temp1=e.target.value;
            var temp2=temp1.replaceAll(/\s/g,'').replace(/[^a-zA-Z ]/g, "")
            console.log(temp2);
            $('input#Country').val(temp2);
          
          
          }
          }}]} 

        // ,edittype:'custom',
      
      
        ,editrules:{
          required:true
          
          // ,
        
          // custom:true
          
          // ,
          // custom_func:this.validateAlpha
          
          
        },
        // editoptions:{dataEvents: [
        //   { type: 'keyup', fn: function(e) {
            
        //     // console.log(String(`${e.target.value}`).match(/^[a-zA-Z ]*$/));
        //   var temp=String($('input#Country').val()).match(/^[a-zA-Z ]*$/);
        //   console.log(temp);
          
        //    if(temp){$('input#Country').val(e.target.value);}
        //   }}]

        // }
      
      },
                
                
                  { name: "Population",index:"Population",sortable:true,sorttype:
                 "number",align:"right"
                
                 , edittype:"textarea",
                 formoptions:{rowpos:window.innerWidth>400?1:2, colpos:window.innerWidth>400?2:1},
                 editable:true,
              
                 search:true,
                  searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'] },
                 
         editoptions:{
          
          // custom_element: myelem, custom_value:myvalue,
          
          dataEvents: [
          { type: 'keyup', fn: function(e) {
            
            // console.log(String(`${e.target.value}`).match(/^[a-zA-Z ]*$/));
          var temp=String($('textarea#Population').val()).match(/^[0-9]*$/);
          console.log(temp);
          
           if(temp){$('textarea#Population').val(e.target.value);}
           else{
            
            var temp1=e.target.value;
            var temp2=temp1.replaceAll(/\s/g,'')
            
            .replace(/[^0-9 ]*/g, "");
            
              // a-zA-Z
            
            
            
            // .replace(/^[a-zA-Z ]*$/, "");
            
            console.log(temp2);
            $('textarea#Population').val(temp2);
          
          
          }
          }}]} 

        // ,edittype:'custom',
      
      
        ,editrules:{
          required:true
          
          // ,
        
          // custom:true
          
          // ,
          // custom_func:this.validateAlpha
          
          
        },
                
                },{ name: "Description",index:"desc",sortable:false,align:"left"
                
               
                , edittype:"textarea",
              
                editable:true,
                search:false,
                
              
                formoptions:{rowpos:window.innerWidth>400?2:3,colpos:1}
                // ,
                //   searchoptions: { sopt: ['cn', 'nc'] },
                 
                
        

       // ,edittype:'custom',
     
     
      , editrules:{
         required:true
         
         // ,
       
         // custom:true
         
         // ,
         // custom_func:this.validateAlpha
         
         
       },},
                {
                  name: 'Actions', index: 'Actions'
                  
                  , 
                  search:false,

                  // width: 100, height: 120,
                  align:"center",
                  editable: false, formatter: 'actions',
                  formatoptions: {
                    
                      keys: true,
                      
                      delbutton : true,
                      editformbutton: true,
                      
                      delOptions: { url: "http://localhost:8000/api/deletejqgridPopulation",  
                      mtype:"Put", 
                      top: 0,
                      left: 0,
                      width:window.innerWidth>400?(window.innerWidth/2):window.innerWidth-50,

                      closeOnEscape: true,  
                      closeAfterDelete: true,  
                      recreateForm: true,  
                      msg: "Are you sure you want to delete ? ",

                      afterSubmit: function (response, postdata) {
                        console.log(postdata);
                        // if (response.responseText === "") {
                        //     $(this).jqGrid('setGridParam', 
                        //       { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                      
                        //       // return [true, '']
                      
                        //   }
                        // else {
              
                            $(this).jqGrid('setGridParam', 
                              { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                             
                             
                              // return [false, response.responseText]
                        
                            // }
                    }, 
                      afterComplete: function (response) {  
                        if (!response.responseJSON.isError) {  
                          alert(response.responseJSON.success);  
                      }
                      }},
                      editOptions : {url: "http://localhost:8000/api/editjqgridPopulation",
                      mtype:"Put",  
                      top: 0,
                            left: 0,
                            width:window.innerWidth>400?(window.innerWidth/2):window.innerWidth-50,
                      closeOnEscape: true,  
                      closeAfterEdit: true,  
                      recreateForm: true,  
                      afterSubmit: function (response, postdata) {
                        console.log(postdata);
                        if (response.responseText === "") {
                            $(this).jqGrid('setGridParam', 
                              { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                      
                              // return [true, '']
                      
                          }
                        else {
                            $(this).jqGrid('setGridParam', 
                              { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                            
                              // return [false, response.responseText]
                        
                            }
                    },   
                      afterComplete: function (response) { 
                      
                        if (!response.responseJSON.isError) {  
                          alert(response.responseJSON.success);  
                      } 
                      }}
                      
                                 }
                }
              ],
        
        // [  


        //     { key: true, hidden: true, name: 'ID', index: 'ID', editable: true },  
        //     { key: false, name: 'Name', index: 'Name', editable: true },  
        //     { key: false, name: 'FatherName', index: 'FatherName', editable: true },  
        //     { key: false, name: 'Gender', index: 'Gender', editable: true, edittype: 'select', editoptions: { value: { 'M': 'Male', 'F': 'Female', 'N': 'None' } } },  
        //     { key: false, name: 'ClassName', index: 'ClassName', editable: true, edittype: 'select', editoptions: { value: { '1': '1st Class', '2': '2nd Class', '3': '3rd Class', '4': '4th Class', '5': '5th Class' } } },  
        //     { key: false, name: 'DateOfAdmission', index: 'DateOfAdmission', editable: true, formatter: 'date', formatoptions: { newformat: 'd/m/Y' } }],  
  
            pager:
             $('#pager1')
            
            ,  
            rownumbers: true,
            rowNum: 10,  
        rowList: [5, 10, 20, "10000:All"],
        loadonce: true,
        height: '100%',  
        viewrecords: true,  
        caption: 'Country Population',  
        emptyrecords: 'No Records are Available to Display'
        
        , 
        onSelectRow: function(ids) { 

          console.log(ids);
          // if(ids == null) {
          //         ids=0; 
          //         if(jQuery("#list10_d").jqGrid('getGridParam','records') >0 ) 
          //         { 
          //             jQuery("#list10_d").jqGrid('setGridParam',{url:"subgrid.php?q=1&id="+ids,page:1});
          //             jQuery("#list10_d").jqGrid('setCaption',"Invoice Detail: "+ids) 
          //             .trigger('reloadGrid'); 
          //         }
          //     } else { 
          //         jQuery("#list10_d").jqGrid('setGridParam',{url:"subgrid.php?q=1&id="+ids,page:1}); 
          //         jQuery("#list10_d").jqGrid('setCaption',"Invoice Detail: "+ids)
          //         .trigger('reloadGrid');
          //     } 
      },
        
        jsonReader: {  
            root: "rows",  
            page: "page",  
            total: "total",  
            records: "records",  
            repeatitems: false,  
            Id: "0"  
        
        
          }
          
          , guiStyle:"bootstrap4",
          iconSet: "fontAwesome",
          gridComplete: function () {
           

$("table#grid1").addClass("table table-striped bg-warning"); 
}
          
          
          , 
        autowidth: true,  
        multiselect: true 
    }).navGrid('#pager1', { edit: true, add: true, del: true, search: true, refresh: true },  
    {  
        zIndex: 100,  
        url: "http://localhost:8000/api/editjqgridPopulation",
        mtype:"Put",  
        top: 0,
        left: 0,
        width:window.innerWidth>400?(window.innerWidth/2):window.innerWidth-50,
        closeOnEscape: true,  
        closeAfterEdit: true,  
        recreateForm: true,  
        afterSubmit: function (response, postdata) {
          console.log(postdata);
          if (response.responseText === "") {
              $(this).jqGrid('setGridParam', 
                { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
        
                // return [true, '']
        
            }
          else {
              $(this).jqGrid('setGridParam', 
                { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
              
                // return [false, response.responseText]
          
              }
      },   
        afterComplete: function (response) { 
        
          if (!response.responseJSON.isError) {  
            alert(response.responseJSON.success);  
        } 
        }  
    },  
    {  
        zIndex: 100,  
        url: "http://localhost:8000/api/createjqgridPopulation",
        mtype:"Post", 
        top: 0,
        left: 0,
        width:window.innerWidth>400?(window.innerWidth/2):window.innerWidth-50,
        closeOnEscape: true,  
        closeAfterAdd: true,  
        afterSubmit: function (response, postdata) {
          console.log(postdata);
          if (response.responseText === "") {
              $(this).jqGrid('setGridParam', 
                { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
        
                // return [true, '']
        
            }
          else {
              $(this).jqGrid('setGridParam', 
                { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
              
                // return [false, response.responseText]
          
              }
      },
        afterComplete: function (response) { 
          console.log(response.responseJSON); 
      
            if (!response.responseJSON.isError) {  
                alert(response.responseJSON.success);  
            }  
        }  
    },  
    {  
        zIndex: 100,  
        url: "http://localhost:8000/api/deletejqgridPopulation",  
        mtype:"Put", 
        top: 0,
        left: 0,
        closeOnEscape: true,  
        closeAfterDelete: true,  
        recreateForm: true,  
        width:window.innerWidth>400?(window.innerWidth/2):window.innerWidth-50,

        msg: "Are you sure you want to delete ... ? ", 
        afterSubmit: function (response, postdata) {
          console.log(postdata);
          
              $(this).jqGrid('setGridParam', 
                { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
               
               
      }, 
        afterComplete: function (response) {  
          if (!response.responseJSON.isError) {  
            alert(response.responseJSON.success);  
        }
        }  
    },{
      zIndex:100,
      caption:"Search Record",
      sopt:['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'ew', 'en',],
      closeOnEscape: true,
      closeAfterSearch:true
    },{
      zIndex:100

    }


    );  


    $(".ui-jqgrid-titlebar-close").hide();


}

 
  render(){
  

    return (
    <>
    
      <div className="sid">
    
      <table id="grid1"></table>
      <div id="pager1">
    
      </div>
      
    </div>
    </>
    
    );}
    }
    
    export default CountryPopJqgrid;