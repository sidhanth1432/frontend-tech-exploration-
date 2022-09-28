
import {getjqgridPopulation} from"./data/api"
import $ from "jquery";
import React,{Component} from "react";
import './App.css'


 import jqGrid from "free-jqgrid"

class DrillDownJqgrid extends Component{


  constructor(){

    super();
    this.state={
       level:0,
      attr:"country"
    //   ,
    //   Country:{
    //     colmodel:[
    //       { name: "Country"},
    //       { name: "Population"}
    //   ],
    //   data:[
    //     {id: "1",Country: "India",Population: "1000"},
    //        {id:"2",Country: "China",Population: "1000"}
    //          ]
    //   },
    //   India:{colmodel:[
    //     {name:'State'},
    //     {name:'Population'}
    
    // ],
    // data:[
    //   {id:'1',State:'ka',Population:'1000'},
    //   {id:'2',State:'ke',Population:'1000'},
    //   {id:'3',State:'tn',Population:'1000'},
      
    // ]
      
    //   }
    //   ,
    //   China:{colmodel:[
    //     {name:'State'},
    //     {name:'Population'}
    
    // ],
    // data:[
    //   {id:"1",State:"a",Population:"1000"},
    //   {id:"2",State:"b",Population:"1000"},
    //   {id:"3",State:"c",Population:"1000"},
      
    // ]
      
    //   }
      
  }
  
}

 get_Population =async () =>{
  try{
      return await getjqgridPopulation();
      
  }
  catch(error){console.log(error.message);}
  
  }
 

  createSmallGrid = (country,attr)=>{
  var createGrid=this.createSmallGrid;
    this.get_Population().then((res)=>{
      console.log(res.data);
      // this.setState({attr:country});
    
   
    var state=res.data;
    console.log(this.state.level);
    if(attr==="state"){
      console.log("if");
   this.setState({attr:country});
   
   this.setState({level:1});
  }else{
    console.log("else");
   this.setState({attr:country});
   
   this.setState({level:0});
  }
    
  var mydata = state['data'][country];
   console.log(mydata);
  var colmodel=state['colmodel'][attr];
  console.log(colmodel);
    $("#grid").jqGrid({
        
        data: mydata,
      
        colModel:colmodel,
        pager:
               $('#pager')
              
              ,  
              hoverrows:false,
              rownumbers: true,
              rowNum: 10,  
          rowList: [5, 10, 20, "10000:All"],
          loadonce: true,
          height: '100%',  
          viewrecords: true,  
       
          emptyrecords: 'No Records are Available to Display',
          
          caption:country,
          guiStyle:"bootstrap4",
          iconSet: "fontAwesome"
          , 
          autowidth: true,  
          multiselect: false,
           gridComplete: function () {
             
            $("table#grid").addClass("table-striped bg-warning"); 
            },
            onSelectRow: function(ids) {
                
              var rowData = $('#grid').jqGrid("getRowData", ids);
              console.log(rowData['country']);
              if(attr==='country'){
              $("#grid").jqGrid('GridUnload');
                             
              createGrid(rowData['country'],"state");
                          }  
                            //  $('#grid').jqGrid('clearGridData');
              
              
                            // $("#grid").jqGrid('setGridParam',{colModel:colmodel,data:mydata});
                            //          $("#grid").jqGrid('setCaption',"Invoice Detail: "+ids) 
                            //            .trigger('reloadGrid'); 
              
              
              
              
              
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
              
                        }

    });

    $(".ui-jqgrid-titlebar-close").hide();
    var hide1=this.state.attr==="country"?"":"hidden";
    console.log(this.state.attr);
    var something = $('<input/>').attr({id:'sid2',type: 'button', name:'btn1', value:'Go Back',class:'btn btn-primary btn-sm float-right sid3'});
 
    $(".ui-jqgrid-titlebar").append(something);

something.click(this.handleClick);

// $("#sid2").hide();

    })
};

componentDidMount(){
  this.get_Population().then((res)=>{
    console.log(res.data);


    var state=res.data;
 var attr=this.state.attr;
  
    var createSmallGrid=this.createSmallGrid;
    
      
     
     
     var mydata = state['data'][attr];
   
          var colmodel=state['colmodel'][attr];
       $("#grid").jqGrid({
   
         colModel: colmodel
         // [
         //       { name: "Country",index:"Country",sortable:false,align:"center"},
         //       { name: "Population",index:"Population",sortable:true,sorttype:
         //       "number",align:"right"}
         //   ]
           
           ,
           
           data:  mydata,
           pager:
                  $('#pager')
                 
                 ,  
                 rownumbers: true,
                 rowNum: 10,  
             rowList: [5, 10, 20, "10000:All"],
             loadonce: true,
             height: '100%',  
             viewrecords: true,  
          
             emptyrecords: 'No Records are Available to Display',
             
             caption:"Country",
             guiStyle:"bootstrap4",
             iconSet: "fontAwesome"
             , 
             hoverrows:false,
             autowidth: true,  
             multiselect: false,
              gridComplete: function () {
                
               $("table#grid").addClass("table-striped bg-warning"); 
               
               },
               onSelectRow: function(ids) {
                
   var rowData = $('#grid').jqGrid("getRowData", ids);
   console.log(rowData['country']);
   
   $("#grid").jqGrid('GridUnload');
                  
                 createSmallGrid(rowData['country'],"state");
                 
                 //  $('#grid').jqGrid('clearGridData');
   
   
                 // $("#grid").jqGrid('setGridParam',{colModel:colmodel,data:mydata});
                 //          $("#grid").jqGrid('setCaption',"Invoice Detail: "+ids) 
                 //            .trigger('reloadGrid'); 
   
   
   
   
   
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
   
             }
   
                     
                     
                     ,
             
         
         
         });
          $(".ui-jqgrid-titlebar-close").hide();
        
  //         var something = $('<input/>').attr({id:'sid2',type: 'button', name:'btn1', value:'a button',class:'btn btn-primary float-right sid3'});
 
  //        $(".ui-jqgrid-titlebar").append(something);
   
  //  something.click(this.handleClick);
   
    // $("#sid2").hide();
   
  // $(".sid3").hide();
         
  })
 


  // the below commented part
//   this.get_Population().then(
//     (res) =>{
//       console.log(res.data);
// var arr=res.data;



// // arr.map((d)=>{

// //   d.Population=format(".2s")(d.Population).replace('G','B');

// // return d;

// // });
// console.log(arr);

//       this.setState({pop:arr});})
//     .catch((err) => { console.log(err.message);
//     });

   

}
componentDidUpdate(){
  
 if(this.state.attr==='country'){
  console.log('hii');
  $("#sid2").hide();}
         
//         $("#grid1").jqGrid({

//           colModel: [
//                 { name: "Country",index:"Country",sortable:false,align:"center",
                
//                 // editable: true
              
//               },
//                 { name: "Population",index:"Population",sortable:true,sorttype:
//                "number",align:"right"
              
//               //  ,editable: true, edittype:"textarea"
              
//               }
//             ],
//             data:  this.state.pop,
            
// 				cmTemplate: { editable: true, autoResizable: true },
// 				iconSet: "fontAwesome",
				
// 				autoResizing: { compact: true },
//             rowNum:3,
//         loadonce: true,
//         rowList:[3,6,9],
//         pager: '#pager1',
//         viewrecords: true,
//         sortorder: "desc",
//         caption:"Country Population",

        
          
//       }          
//           )
//           // .jqGrid("navGrid", {
//           //   addtext: "Add",
//           //   edittext: "Edit",
//           //   deltext: "Delete",
//           //   searchtext: "Search",
//           //   refreshtext: "Reload",
//           //   viewtext: "View",
//           //   view: true
//           // })

//           .jqGrid("filterToolbar")

//           .jqGrid("gridResize");

// //     var mydata = [
// //       { id: "10",  invdate: "2007-10-01", name: "test",   note: "note",   amount: "",       tax: "",      closed: true,  ship_via: "TN", total: "" },
// //       { id: "20",  invdate: "2007-10-02", name: "test2",  note: "note2",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
// //       { id: "30",  invdate: "2007-09-01", name: "test3",  note: "note3",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
// //       { id: "40",  invdate: "2007-10-04", name: "test4",  note: "note4",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00" },
// //       { id: "50",  invdate: "2007-10-31", name: "test5",  note: "note5",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
// //       { id: "60",  invdate: "2007-09-06", name: "test6",  note: "note6",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
// //       { id: "70",  invdate: "2007-10-04", name: "test7",  note: "note7",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00" },
// //       { id: "80",  invdate: "2007-10-03", name: "test8",  note: "note8",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
// //       { id: "90",  invdate: "2007-09-01", name: "test9",  note: "note9",  amount: "400.00", tax: "30.00", closed: false, ship_via: "TN", total: "430.00" },
// //       { id: "100", invdate: "2007-09-08", name: "test10", note: "note10", amount: "500.00", tax: "30.00", closed: true,  ship_via: "TN", total: "530.00" },
// //       { id: "110", invdate: "2007-09-08", name: "test11", note: "note11", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00" },
// //       { id: "120", invdate: "2007-09-10", name: "test12", note: "note12", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00" }
// //   ],
// //   $grid = $("#grid"),
// //   initDateEdit = function (elem) {
// //       $(elem).datepicker({
// //           dateFormat: "dd-M-yy",
// //           autoSize: true,
// //           changeYear: true,
// //           changeMonth: true,
// //           showButtonPanel: true,
// //           showWeek: true
// //       });
// //   },
// //   initDateSearch = function (elem) {
// //       setTimeout(function () {
// //           initDateEdit(elem);
// //       }, 100);
// //   };

// // $grid.jqGrid({
// //   data: mydata,
// //   colNames: ["", "Client", "Date", "Amount", "Tax", "Total", "Closed", "Shipped via", "Notes"],
// //   colModel: [
// //       { name: "act", template: "actions", width: 105 },
// //       { name: "name", align: "center", width: 92, editrules: {required: true} },
// //       { name: "invdate", width: 72, align: "center", sorttype: "date", frozen: true,
// //           formatter: "date", formatoptions: { newformat: "d-M-Y", reformatAfterEdit: true }, datefmt: "d-M-Y",
// //           editoptions: { dataInit: initDateEdit },
// //           searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"], dataInit: initDateSearch } },
// //       { name: "amount", width: 56, template: "number" },
// //       { name: "tax", width: 35, template: "number", autoResizableMinColSize: 40 },
// //       { name: "total", width: 43, template: "number" },
// //       { name: "closed", width: 49, template: "booleanCheckboxFa" },
// //       { name: "ship_via", width: 76, align: "center", formatter: "select",
// //           edittype: "select", editoptions: { value: "FE:FedEx;TN:TNT;IN:Intim", defaultValue: "IN" },
// //           stype: "select", searchoptions: { sopt: ["eq", "ne"], value: ":Any;FE:FedEx;TN:TNT;IN:IN" } },
// //       { name: "note", width: 43, edittype: "textarea", sortable: false }
// //   ],
// //   cmTemplate: { editable: true, autoResizable: true },
// //   iconSet: "fontAwesome",
// //   rowNum: 10,
// //   autoResizing: { compact: true },
// //   rowList: [5, 10, 20, "10000:All"],
// //   viewrecords: true,
// //   pager: true,
// //   toppager: true,
// //   inlineEditing: { keys: true, position: "afterSelected" },
// //   rownumbers: true,
// //   sortname: "invdate",
// //   sortorder: "desc",
// //   caption: "Demonstration of the usage custom action buttons",
// //   actionsNavOptions: {
// //       addUsericon: "fa-user-plus",
// //       addUsertitle: "Add user",
// //       deleteUsericon: "fa-user-times",
// //       deleteUsertitle: "Delete user",
// //       addToCarticon: "fa-cart-plus",
// //       addToCarttitle: "Add item to the cart",
// //       custom: [
// //           { action: "addUser", position: "first", onClick: function (options) { alert("Add user, rowid=" + options.rowid); } },
// //           { action: "addToCart", position: "first", onClick: function (options) { alert("Add to Cart, rowid=" + options.rowid); } },
// //           { action: "deleteUser", onClick: function (options) { alert("Delete user, rowid=" + options.rowid); } }
// //       ]
// //   }
// // }).jqGrid("gridResize");

}

handleClick=()=>{
  console.log("dasdasd");
  
  $("#grid").jqGrid('GridUnload');
  
  this.setState({level:0});         
  this.createSmallGrid("country","country");
  
  
}
  
render(){
  

return (
<>
{/* <div className="sid">
<button type="button" hidden={this.state.level===0?"hidden":""} className="btn btn-primary float-right" onClick={
  this.handleClick
//   () => {
//   console.log("ds");
  
  
// $("#grid").jqGrid('GridUnload');
           
// this.createSmallGrid("Country",this.state,this.changelevel);
// this.setState({level:0});

// }


}>Back to Country</button>
</div>
 */}

<div className="sid">

    <table id="grid"></table>
    <div id="pager"></div>
  </div>
  {/* <div className="sid">
  <table id="grid1"></table>
  <div id="pager1"></div>
</div> */}
</>

);}
}

export default DrillDownJqgrid;

// import $ from "jquery";
// import React,{useEffect} from "react";
// import './App.css'
// import jqGrid from "jqGrid"

// const App=()=> {

// useEffect(()=>{

  
    
//         $("#grid").jqGrid({
//             colModel: [
//                 { name: "firstName" },
//                 { name: "lastName" }
//             ],
//             data: [
//                 { id: 10, firstName: "Angela", lastName: "Merkel" },
//                 { id: 20, firstName: "Vladimir", lastName: "Putin" },
//                 { id: 30, firstName: "David", lastName: "Cameron" },
//                 { id: 40, firstName: "Barack", lastName: "Obama" },
//                 { id: 50, firstName: "François", lastName: "Hollande" }
//             ]
//         });
//     },[]);
    


  
//   return(<div>
//     <table id="grid"></table></div>);
// }


// export default App;


// import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6
// import logo from './logo.svg';
// import $ from 'jquery';
// import './App.css';

// class App extends Component {
//   constructor () {
//     super()

//     this.state = {
//       isOpenJQuery: false,
//       isOpenTG: false
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <div>Click the box to open it</div>
//         <fieldset>
//           <legend>Using <a href='https://jquery.com/'>jQuery</a></legend>
//           <GiftBoxJQuery isOpen={this.state.isOpenJQuery} openBox={() => this.setState({isOpenJQuery: true})}/>
//         </fieldset>
//         <fieldset>
//           <legend>Using <a href='https://github.com/reactjs/react-transition-group'>react-transition-group</a></legend>
//           <GiftBoxTransitionGroup isOpen={this.state.isOpenTG} openBox={() => this.setState({isOpenTG: true})}/>
//         </fieldset>
//       </div>
//     );
//   }
// }

// class GiftBoxTransitionGroup extends Component {
//   render () {
//     return <div className='GiftBox gitten'>
//       <CSSTransitionGroup
//           transitionName="example"
//           transitionEnterTimeout={500}
//           transitionLeaveTimeout={3000}>
//         {!this.props.isOpen && <img className='GiftBox-img' src='/gift_box_red.jpg' alt='box' onClick={() => this.props.openBox()}/>}
//       </CSSTransitionGroup>
//     </div>
//   }
// }

// class GiftBoxJQuery extends Component {
//   componentDidUpdate() {
//     if (this.props.isOpen) {
//       $('.jquery-box').fadeOut(3000)
//     }
//   }

//   render () {
//     return <div className='GiftBox puppy'>
//       <img className='GiftBox-img jquery-box' src='/gift_box_red.jpg' alt='box' onClick={() => this.props.openBox()}/>
//     </div>
//   }
// }

// export default App;