import axios from 'axios'
export const getjqgridPopulation = async () => {
   
    
    
    
  return await axios.get("http://localhost:8000/api/drilldownjqgridPopulation");

  
  
}
export const getGeodata = async () => {


  
  return await axios.get(`http://localhost:8000/api/geoServer`);
}

export const UploadCountryPopulationData = async (file) => {

  const formData =new FormData();
 

  formData.append('profile_picture',file);
  
    return await axios.post(`http://localhost:8000/api/uploadCountryPopulationData`,formData,{
      'Content-Type': 'application/json'});
}


export const getPopulation = async () => {
  console.log("im called");
  return await axios.get("http://localhost:8000/api/population");

}

export const getWords = async () => {
   
    
    
    
  return await axios.get("http://localhost:8000/api/words");

  
  
}

// module.exports = {

//     register : async (name,dob,gender,address,email,phone_number,file) => {

//         const formData =new FormData();
//         formData.append('name',name);
//         formData.append('dob',dob);
//         formData.append('gender',gender);
//         formData.append('address',address);
//         formData.append('email',email);
//         formData.append('phone_number',phone_number);
      
//         formData.append('profile_picture',file);
        
//           return await axios.post("http://localhost:8000/api/reg",formData,{
//             'Content-Type': 'application/json'});
//       }
// }


export const register = async (state_name,state_dob,state_gender,state_address,state_email,state_phone_number,state_file) => {

  const formData =new FormData();
  formData.append('name',state_name);
  formData.append('dob',state_dob);
  formData.append('gender',state_gender);
  formData.append('address',state_address);
  formData.append('email',state_email);
  formData.append('phone_number',state_phone_number);

  formData.append('profile_picture',state_file);
  
    return await axios.post(`${process.env.REACT_APP_API}/reg`,formData,{
      'Content-Type': 'application/json'});
}

export const getUserById = async (id) => {

    
    
    
      return await axios.get(`${process.env.REACT_APP_API}/getUserById`,
      {params:{
          id:id,
          

      }});
  }

  export const putUserById = async (id,name,dob,gender,address) => {
   
    
    
    
    return await axios.put(`${process.env.REACT_APP_API}/putUserById/`+id,{name:name,dob:dob,gender:gender,address:address});


    
    
}

export const deleteUserById = async (id) => {
   
    
    
    
  return await axios.put(`${process.env.REACT_APP_API}/deleteUserById/`+id);


  
  
}

  
  export const getUsers = async (usersPerPage,offset) => {
    console.log("im called");
    return await axios.get(`${process.env.REACT_APP_API}/users`,
    {params:{
        usersPerPage:usersPerPage,
        offset:offset

    }}
    
    );
  
  }