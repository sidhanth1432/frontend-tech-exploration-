import {createSlice,createAsyncThunk,createSelector,createEntityAdapter} from "@reduxjs/toolkit";


const post_url="";

const postsAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})

const initialState=postsAdapter.getInitialState({
    status:'idle',
    error:null,
    count:0
})
const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        reactionAdded(state,action){
            const {postId,reaction}=action.payload;
            const existingPost=state.posts.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++
            }
      
      
        },
        increaseCount(state,action){
            state.count=state.count+1;

        }
    }


    
})
