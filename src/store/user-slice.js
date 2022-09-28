import {createSlice, nanoid,createAsyncThunk} from "@reduxjs/toolkit";

import moment from 'moment';
import axios from 'axios';
import { timeMonday } from "d3";

const Post_url="";

export const fetchPosts=createAsyncThunk('posts/fetchPosts',async()=>{
    try{
const response=await axios.get(Post_url)
return [...response.data];

    }
    catch(e){
        return e.message;
    }
})


export const addNewPost=createAsyncThunk('posts/addNewPost',async(initialPost)=>{
    try{
const response=await axios.post(Post_url,initialPost)
return response.data;

    }
    catch(e){
        return e.message;
    }
})



export const updatePost=createAsyncThunk('posts/updatePost',async(initialPost)=>{
   
   const {id}=initialPost;
    try{
const response=await axios.put(`${Post_url}/${id}`,initialPost)
return response.data;

    }
    catch(e){
        return e.message;
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        
        name:"",
        temp_dob:"",dob:"",gender:"",address:"",
    
    email:"",phone_number:"",file:"",tableinfo:[]},
    extraReducers(builder){
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.status='loading'
        })
        // .addCase(fetchPosts.fulfilled,(state,action)=>{
        //     state.status='succeeded'
        //     let min=1;
        //     const loadedPosts=action.payload.map(post=>{
        //         post.date=sub(new Date(),{minutes:min++}).toISOString()
        //    post.reactions={
        //     thumbsup:0
        //    }
        //    return post;
        //     });

        //     state.posts=state.posts.concat(loadedPosts)
        // })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            
action.payload.userId=Number(action.payload.userId)

action.payload.date=new Date().toISOString();

action.payload.reactions={
    eyes:0
}

state.posts.push(action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            

            if(!action.payload?.id){
                return;

            }
            const {id}=action.payload;
            action.payload.date=new Date().toISOString();
            const posts=state.posts.filter(post=>post.id!==id);
state.posts=[...posts,action.payload];
            
                    })
    },

    reducers:{



        reactionAdded(state,action){
            const {postId,reaction}=action.payload;
            const existingPost=state.tableinfo.find(post=>post.id===postId)
if(existingPost){
    existingPost.reactions[reaction]++
}

        },
        postAdded:{
            reducer(state,action){
                state.tableinfo.push(action.payload)
            },
            prepare(title,content){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        date: new Date().toISOString(),
                        content
                    }
                }
            }
        },
        addTableInfo(state,action){
            var temp=action.payload;
            console.log(temp);
            state.tableinfo.push(temp);
        },

        addName(state,action){
            if(action.payload ===""){state.name="";}else{
            const Item = action.payload;

state.name=Item;
            }
        },addDob(state,action){
            if(action.payload ===""){state.dob="";}else{
            const Item = moment(action.payload).format('yyyy/MM/DD');

state.dob=Item;
            }
        },
        addTempDob(state,action){
            if(action.payload ===""){state.temp_dob="";}else{
            const Item = action.payload;

state.temp_dob=Item;
            }
        },
        addGender(state,action){
            if(action.payload ===""){state.gender="";}else{
            const Item = action.payload;

state.gender=Item;
            }
        },
        
        addAddress(state,action){
            if(action.payload ===""){state.address="";}else{
            const Item = action.payload;

state.address=Item;
            }
        },

        addEmail(state,action){
            if(action.payload ===""){state.email="";}else{
            const Item = action.payload;

state.email=Item;
            }
        },
        addPhone_Number(state,action){
            if(action.payload ===""){state.phone_number="";}else{
            const Item = action.payload;

state.phone_number=Item;
            }
        },

        addFile(state,action){
            if(action.payload ==="" || action.payload ==={}){state.file="";}else{
            const Item = action.payload;

state.file=Item;
            }
        },
//         ,
        
        addUser(state,action){
const Item = action.payload;

state.name=Item.name;

state.dob=moment(Item.dob).format('yyyy/MM/DD');

// state.temp_dob=Item.temp_dob;

state.gender=Item.gender;

state.address=Item.address;

state.email=Item.email;

// state.submit=Item.submit;

state.phone_number=Item.phone_number;

// state.file=Item.file;
        },
        removeUser(state){
            
state.name="";

state.dob="";
state.temp_dob="";

state.gender="";

state.address="";

state.email="";

state.phone_number="";

state.file=null;

        },
    }
});

export const userActions = userSlice.actions;

export default userSlice;
