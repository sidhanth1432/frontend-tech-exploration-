import React,{useState,useEffect} from 'react';
import $ from "jquery";
import "./App.css";
import ReactPaginate from "react-paginate";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import Register from './Register';
import { getUsers } from './data/api';
import axios from 'axios'
import { deleteUserById } from './data/api';

import { register} from './data/api';
import { userActions } from './store/user-slice';
import {useDispatch,useSelector} from "react-redux";
import DatePicker from 'react-datepicker'
import {CalendarOutlined} from "@ant-design/icons"
const Users = () =>{
  
    
  
  
  let navigate=useNavigate();

    const [users,setUsers] =useState();
    const [pageCount,setPageCount] =useState(0);
//represents the page we are in
const [pageNumber,setPageNumber]= useState(0);
const [userCount,setUserCount]= useState(0);

const [offset,setOffset]= useState(0);
const usersPerPage=3;

//number of users/pages visited till now
// const pagesVisited =pageNumber*usersPerPage;


// the registration functionality

 
const dispatch = useDispatch();
let state_name = useSelector((state)=>state.user.name);


let state_dob = useSelector((state)=>state.user.dob);



let state_temp_dob = useSelector((state)=>state.user.temp_dob);


let state_gender = useSelector((state)=>state.user.gender);


let state_address = useSelector((state)=>state.user.address);


let state_email = useSelector((state)=>state.user.email);



let state_file = useSelector((state)=>state.user.file);


let state_phone_number = useSelector((state)=>state.user.phone_number);

const [isOpen, setIsOpen] = useState(false);



const FileChange =(e)=>{
  dispatch(userActions.addFile(e.target.files[0]));
  console.log(e.target.files[0]);
  console.log(state_file);

  
}
const validatealpha = (char) => {
  console.log(String(char).match(/^[a-zA-Z ]*$/));
  return String(char).match(/^[a-zA-Z ]*$/) ;
};

  const validateCharacter = (char) => {
  
  return String(char).match(/^\d*$/) ;
};

  const validateNumber = (phone_number1) => {
    if((phone_number1.length > 10)){return false;}
    return validateCharacter(phone_number1);
  };



  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit =  (e) => {
    
    e.preventDefault();
    try{

  
      register(state_name,state_dob,state_gender,state_address,state_email,state_phone_number,state_file).then(
          (res) =>{
  
          res.data.isError?toast.error(res.data.Error):toast.success(res.data.success);
        
          // res.data.isError?dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number})):dispatch(userActions.removeUser());
        
          if(!res.data.isError){ $('#closureModal')[0].click(); dispatch(userActions.removeUser());
          get_userlist();}
     
        })
          // .catch((err) => { toast.error(err.message);
  
          //   // dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number}));
          
          // });
      
          
  } catch (error){
  
    // dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number}));
    
  
  // console.log(error);
  toast.error(error.message);
  }
   
  }

  const submitbttn = ()=>{

    return(<><h6>Profile picture</h6>
    
    <input type="file" className="form-control-file" name="profile_picture" onChange={(e) => {
     
      FileChange(e);
      
      }} autoFocus />
    
    
    <div className="mb-2 text-center">
     <button type="submit" className="btn btn-primary mt-3" disabled={!state_name || !state_dob ||!state_gender||!state_address||!state_email||!state_phone_number} >Register</button>
     </div></>);
    
    }
    
    const gendercheckbox = ()=>

    <div className='d-flex flex-row my-2'>  
    <h6>Gender</h6>
    
    <div className="form-check ">
    <label>
      <input
        type="checkbox"
        value="Male"
        checked={state_gender === "Male"}
        onChange={(e) => dispatch(userActions.addGender(e.target.value))}
      />
      Male
    </label>
    </div>
    <div className="form-check ">
    <label>
      <input
        type="checkbox"
        value="Female"
        checked={state_gender === "Female"}
    
        onChange={(e) => dispatch(userActions.addGender(e.target.value))}
      />
      Female
    </label>
    </div>
    <div className="form-check">
    <label>
      <input
        type="checkbox"
        value="Other"
        checked={state_gender === "Other"}
        onChange={(e) => dispatch(userActions.addGender(e.target.value))}
      />
      Other
    </label>
    </div>
    </div>


const handleClick = (e) => {
  e.preventDefault();
  setIsOpen(!isOpen);
};

const registerForm=() => <form onSubmit={handleSubmit} encType="multipart/form-data">

<input type="text" className="form-control my-2" placeholder="Name" value={state_name ==null ? '' : state_name} onChange={(e) =>{if (validatealpha(e.target.value)){ dispatch(userActions.addName(e.target.value));}}} autoFocus />
  

<div className="d-flex align-items-center">
<input type="text" className="form-control w-50" placeholder={"Date of birth"} value={state_dob ==null ? '' : state_dob}  disabled />

{/* <div className="float-right align-items-center"> */}

        <button className="align-items-center" onClick={handleClick}>
        <CalendarOutlined />
      </button>
   
{/* </div>    */}

 </div><div className="float-right align-items-center">
      {isOpen && (
        <DatePicker inline selected={state_temp_dob} onChange={date => {dispatch(userActions.addTempDob(date));dispatch(userActions.addDob(date));setIsOpen(!isOpen);}}  maxDate={new Date()} isClearable showYearDropdown scrollableYearDropdown yearDropdownItemNumber={150} scrollableMonthYearDropdown
        
        />
      )}
</div>
<input type="text" className="form-control my-2" placeholder="Address" value={state_address ==null ? '' : state_address} onChange={(e) => dispatch(userActions.addAddress(e.target.value))} autoFocus />

{gendercheckbox()}

<input type="email" className="form-control my-2" placeholder="Email" value={state_email ==null ? '' : state_email} onChange={(e) => dispatch(userActions.addEmail(e.target.value))} autoFocus />

<input type="tel" className="form-control my-2" placeholder="Phone Number" value={state_phone_number ==null ? '' : state_phone_number} onChange={(e) => {if(validateNumber(e.target.value)){dispatch(userActions.addPhone_Number(e.target.value));}; } }autoFocus />

{submitbttn()}
  </form>




const get_userlist =async () =>{
try{
  console.log(offset);
    const fileslist= await getUsers(usersPerPage,offset);
    setUsers(fileslist.data[1]);
    console.log(fileslist.data);

    // console.log(fileslist.data[usersPerPage].totalcount);
setUserCount(fileslist.data[0].total_users_count);
    setPageCount(Math.ceil(fileslist.data[0].total_users_count/usersPerPage));

}
catch(error){console.log(error);}

}

const delete_user_by_id =async (id) =>{


    try{
        const fileslist= await deleteUserById(id);
        // setUsers(fileslist.data[1]);
        setPageCount(Math.ceil(fileslist.data[0].total_users_count/usersPerPage));

        fileslist.data[1].isError?toast.error(fileslist.data[1].Error):toast.success(fileslist.data[1].success);
        get_userlist();
      
        // console.log(fileslist.data[usersPerPage].totalcount);
    
    
        // setPageCount(Math.ceil(fileslist.data[0].total_users_count/usersPerPage));
    
    }
    catch(error){toast.error(error.message);}



//     try{
//       deleteUserById(id).then(
//         (res) =>{
// console.log(res.data);
//         res.data.isError?toast.error(res.data.Error):toast.success(res.data.success);
        
   
//       })
//         .catch((err) => { toast.error(err.message);

//         });
//         // setUsers(fileslist.data[1]);
//         // console.log(fileslist.data);
    
//         // // console.log(fileslist.data[usersPerPage].totalcount);
    
    
//         // setPageCount(Math.ceil(fileslist.data[0].total_users_count/usersPerPage));
    
//     }
//     catch(error){console.log(error);toast.error(error.message);}
    
    }
    
useEffect(()=>{
    get_userlist();
//     // try{
       
//         getUsers().then(
//             (res) =>{ console.log(res.data);setUsers(res.data);})
//             .catch((err) => { toast.error(err.message)});
                    
// // } catch (error){
                
//     toast.error(error.message);
// }
 
},[offset]);
   






    // const getUsers = async () => {
    //     console.log("im called");
    //     return await axios.get("http://localhost:8000/api/users",
    //     {params:{
    //         usersPerPage:usersPerPage,
    //         offset:offset

    //     }});
    //   }

// //THE users to be displayedin the current page
// const displayUsers= users?users

// // .slice(pagesVisited,pagesVisited +usersPerPage)

// .map((user) => {
//     return (
        
//         // <div className="row">
        
//             <div className="col-md-12" key={user.id}>
                
// {/*                 
//             <h3>{user.firstName}</h3>
//              */}
              
//               <div className="row g-0 g-sm-1 gmd-2 g-lg-3 g-xl-4 g-xxl-5 mb-5">
// {/* 
// <div className="card mb-2 border-0 p-0 shadow">
//     <h3 className='card-header text-center'>{user.name}</h3>
//     <ul className='list-group list-group-flush'>
//         <li className='list-group-item'>Gender:{user.gender}</li>

//         <li className='list-group-item'>DOB:{user.dob}</li>

//         <li className='list-group-item'>Address:{user.address}</li>

//         <li className='list-group-item'>Email:{user.email}</li>

//         <li className='list-group-item'>Phone Number:{user.phone_number}</li>

       
//     </ul>
// <img src={user.profile_picture} className="card-img img-fluid w-50 d-block mx-auto" alt="img" />
//             </div> */}

// <div className='col-auto' key={user.id}>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>

// <div className='col-auto'>{user.name}</div>
       
//      </div>
//     </div>
      
      
//       );

// }):[];
if(!userCount){
    return (<><div className="alert alert-danger " role="alert">
        <h3 className='alert-heading text-center'>No Active Users</h3></div>
        


        <div className="text-center">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  New User Registration
</button>
</div>

        
         
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
    <div className="modal-content">
      <div className="row">
        <div className="col-10 text-center p-2">
  <h4>Sign up</h4> 
        </div>
        <div className="col-2 d-flex align-items-center">
        <button type="button" id="closureModal" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      </div>
      <div className="modal-body">
      {registerForm()}
     
    




      </div>



      <div className="modal-footer">
      
        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
         */}
      </div>
    </div>
  </div>
</div>






        </>);
        
  }


const displayUsers= users?users.map((user) => {
return (<div key={user.id}>   
     <div className="row g-0 g-sm-1 gmd-2 g-lg-3 g-xl-4 g-xxl-5 shadow p-3"  >

<div className='col-md-4 p-1' >
         <img src={user.profile_picture} className="img-fluid w-50 d-block mx-auto" alt="img" /> 
         </div>
         <div className='col-md-4 p-1'>
         <h3 className='text-center'>{user.name}</h3>
         <ul className='list-group list-group-flush  overflow-auto'>
        <li className='list-group-item'>Gender:{user.gender}</li>

         <li className='list-group-item'>DOB:{user.dob}</li>

        <li className='list-group-item'>Address:{user.address}</li>

        <li className='list-group-item'>Email:{user.email}</li>

      <li className='list-group-item'>Phone Number:{user.phone_number}</li>

       
    </ul>

         </div>

         <div className='col-md-4 p-1'>
            
            <div className="row g-0 g-sm-1 gmd-2 g-lg-3 g-xl-4 g-xxl-5 my-1">
         <div className='col-6'><button type="button" className="btn btn-primary d-block mx-auto" onClick={() => {navigate("/reg/"+user.id);}}>Edit</button></div>
         <div className='col-6'><button type="button" className="btn btn-primary d-block mx-auto" onClick={() => {if(window.confirm("Do you really want to delete user "+user.name)){delete_user_by_id(user.id);}}}>Delete</button></div>
         </div>
         </div>

         

        
         </div>
{/* 
<div className="row g-0 g-sm-1 gmd-2 g-lg-3 g-xl-4 g-xxl-5 mb-5">
<div className='col-12 col-md-6 col-lg-3'>hii</div>
<div className='col-12 col-md-6 col-lg-3'>hii</div>
        </div> */}

        
        
        {/* //  <div className='col-auto'>{user.gender}</div>
      
        //   <div className='col-auto'>{user.dob}</div>
        //  <div className='col-auto'>{user.address}</div>
        //  <div className='col-auto'>{user.email}</div>
         
        //  <div className='col-auto'>{user.phone_number}</div> */}
          
        </div>

);}):[];


// // NUMBER OF BUTTONS =the TOTAL number of users divided by the users per page
// const pageCount =users?Math.ceil(users.length/usersPerPage):0;
//   // the function that increments or decrements the page number
//   //selected is the page we want to move to

const changePage =({selected}) => {
    setPageNumber(selected);
    console.log(selected);
    
    // if(selected>0){
        
        setOffset((selected)*usersPerPage);
    
    // }
    // else{setOffset(0);}


//     try{
//         getUsers().then(
//             (res) =>{ console.log(res.data);setUsers(res.data);})
//             .catch((err) => { toast.error(err.message)});
                    
// } catch (error){
                
//     toast.error(error.message);
// // }
// get_userlist();
 

};

    return(
        <div className="container p-5">


<div className="text-center">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  New User Registration
</button>
</div>

        
         
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
    <div className="modal-content">
      <div className="row">
        <div className="col-10 text-center p-2">
  <h4>     Sign up</h4> 
        </div>
        <div className="col-2 d-flex align-items-center">
        <button type="button" id="closureModal" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      </div>
      <div className="modal-body">
      {registerForm()}
     
    




      </div>



      <div className="modal-footer">
      
        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
         */}
      </div>
    </div>
  </div>
</div>



        
             
      {displayUsers}
      
 <div className='my-5'>
<ReactPaginate
previousLabel={"Previous"}
nextLabel={"Next"}
pageCount={pageCount}
onPageChange={changePage}
containerClassName={"paginationBttns"}
previousLinkClassName={"previousBttn"}
nextLinkClassName={"nextBttn"}
disabledClassName={"paginationDisabled"}
activeClassName={"paginationActive"}
renderOnZeroPageCount={null}
/>

</div>
      </div>
    )
}


export default Users;

