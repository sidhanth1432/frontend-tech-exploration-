import $ from "jquery";
import React,{useState,useEffect} from "react";
import {toast} from 'react-toastify';
import {useParams,Navigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch,useSelector} from "react-redux";
import { userActions } from './store/user-slice';
import DatePicker from 'react-datepicker'
import {CalendarOutlined} from "@ant-design/icons"
import { register,getUserById,putUserById } from './data/api';
import './App.css';
const Register = () =>{
let {id}= useParams();

useEffect(()=>{
  if(id){
  get_user_by_id(id);
  }
},[]);


 
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

  const [goToUsers ,setGoToUsers]=useState(false);

if(goToUsers){
  return <Navigate to="/" />;
}

const get_user_by_id =async (id) =>{
  try{
      const userByIdData= await getUserById(id);
      console.log(userByIdData.data);
if(!userByIdData.data[1].isError){
  console.log(userByIdData.data[0]);
  dispatch(userActions.addUser(userByIdData.data[0]));
  setGoToUsers(false);
    return;
    }
setGoToUsers(true);
  }
  catch(error){console.log(error);
  
  setGoToUsers(true);}
  
  }
      
// const register = async () => {

//   const formData =new FormData();
//   formData.append('name',state_name);
//   formData.append('dob',state_dob);
//   formData.append('gender',state_gender);
//   formData.append('address',state_address);
//   formData.append('email',state_email);
//   formData.append('phone_number',state_phone_number);

//   formData.append('profile_picture',state_file);
  
//     return await axios.post("http://localhost:8000/api/reg",formData,{
//       'Content-Type': 'application/json'});
// }

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

  const isEdit = () => {
    
    if(!goToUsers && (id)){
      
      
      return true;}
    
    return false;
  };
 
  // useEffect(()=>{
  //   get_user_by_id(id);
 
  // },[]);
   

const handleSubmit =  (e) => {
    
  e.preventDefault();
 
 
if(!state_email || !state_phone_number){
  toast.error("email and phone number is reqd");
  
}


else if(!validateEmail(state_email)){toast.error("Enter a valid email");}
else if(!validateNumber(state_phone_number)){toast.error("Enter a valid phone number");}
else{

if(!isEdit()){
try{

  
    register(state_name,state_dob,state_gender,state_address,state_email,state_phone_number,state_file).then(
        (res) =>{

        res.data.isError?toast.error(res.data.Error):toast.success(res.data.success);
      
        // res.data.isError?dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number})):dispatch(userActions.removeUser());
      
        if(!res.data.isError){ $('#closureModal')[0].click(); dispatch(userActions.removeUser());setGoToUsers(true);}
   
      })
        // .catch((err) => { toast.error(err.message);

        //   // dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number}));
        
        // });
    
        
} catch (error){

  // dispatch(userActions.addUser({state_name,state_dob,temp_dob,state_file,state_gender,state_address,state_email,state_phone_number}));
  

// console.log(error);
toast.error(error.message);
}
}else{

  try{

  
    putUserById(id,state_name,state_dob,state_gender,state_address).then(
        (res) =>{

        res.data.isError?toast.error(res.data.Error):toast.success(res.data.success);
        if(!res.data.isError){ $('#closureModal')[0].click(); dispatch(userActions.removeUser());setGoToUsers(true);}
   
      })
        .catch((err) => { toast.error(err.message);
        });
    
        
      } catch (error){
        toast.error(error.message);
      }     



}
}


}
const submitbttn = ()=>{

if(isEdit()){return(
<div className="mb-2 text-center">
 <button type="submit" className="btn btn-primary mt-3" disabled={!state_name || !state_dob ||!state_gender||!state_address||!state_email||!state_phone_number} >Update</button>
 </div>);}
else{return(<><h6>Profile picture</h6>

<input type="file" className="form-control-file" name="profile_picture" onChange={(e) => {
 
  FileChange(e);
  // setFile(e.target.files[0]);console.log(file);
  
  }} autoFocus />


<div className="mb-2 text-center">
 <button type="submit" className="btn btn-primary mt-3" disabled={!state_name || !state_dob ||!state_gender||!state_address||!state_email||!state_phone_number} >Register</button>
 </div></>);

}}

const header=(hType)=>{
  if(hType==="title1"){
if(!isEdit()){return  <h4 className='text-center'>User Registration Form</h4>}
else{return  <h4 className='text-center'>User Info Edit Form</h4>}
}
else{
  if(!isEdit()){return  <h3 className="modal-title " id="exampleModalLabel">Sign Up</h3>}
  else{return  <h3 className="modal-title " id="exampleModalLabel">Edit</h3>}
  
}


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

<input type="email" className="form-control my-2" placeholder="Email" value={state_email ==null ? '' : state_email} onChange={(e) => dispatch(userActions.addEmail(e.target.value))} autoFocus disabled={isEdit()}/>

<input type="tel" className="form-control my-2" placeholder="Phone Number" value={state_phone_number ==null ? '' : state_phone_number} onChange={(e) => {if(validateNumber(e.target.value)){dispatch(userActions.addPhone_Number(e.target.value));}; } }autoFocus disabled={isEdit()} />

{submitbttn()}
  </form>

  return(
    <div className="container p-5">

      {/* <h1>{id}</h1>
       */}
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow">
          {header("title1")}
  <div className="text-center">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch Form
</button>
</div>

        
         
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
    <div className="modal-content">
      <div className="row">
        <div className="col-10 text-center p-2">
        {header("title2")}
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



        </div>
        {/* <div className="col-md-3">
       
          
       
        <div className='pt-5 mt-4'> <button className="example-custom-input" onClick={handleClick}>
        <CalendarOutlined />
      </button>
      
      {isOpen && (
        <DatePicker inline selected={temp_dob} onChange={date => {setTemp_dob(date);setDob(moment(date).format('yyyy/MM/DD'));setIsOpen(!isOpen);}}  maxDate={new Date()} isClearable showYearDropdown scrollableMonthYearDropdown />
      )} </div></div> */}
      </div>
    </div>

  )
}


export default Register;

