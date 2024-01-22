import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import appwriteService from '../appwrite/config'


export const getIntialStateAsync = createAsyncThunk("post/getIntialState", async(_, thunkApi)=> {
    try {
        const posts = await appwriteService.getPosts();
        if(posts) {
            thunkApi.dispatch(setIntialState(posts.documents));
        }
    } catch (error) {
        console.log(error);
    }
})





const initialState = {
    posts:[]
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        setIntialState:(state, action) => {
          state.posts = [...action.payload]
        }
    }
})


export const {setIntialState} = postSlice.actions;

export default postSlice.reducer;