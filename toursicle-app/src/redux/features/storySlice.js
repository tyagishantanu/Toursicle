import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from './../api';

// create story action
export const createStory = createAsyncThunk(
    "story/createStory", 
    async({updatedStoryData, navigate, toast}, {rejectWithValue}) => {
        try{
            const response = await api.createStory(updatedStoryData);
            // show user successful add
            toast.success("Story Added Successfully!");
            navigate("/");
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// get all stories to display across various sections of application
export const getStories = createAsyncThunk(
    "story/getStories", 
    async(page, {rejectWithValue}) => {
        try{
            // 
            const response = await api.getStories(page);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// Get single story action, used in full story view page
export const getStory = createAsyncThunk(
    "story/getStory", 
    async(id, {rejectWithValue}) => {
        try{
            const response = await api.getStory(id);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// After login, fetch user specific data
export const getStoriesByUser = createAsyncThunk(
    "story/getStoriesByUser", 
    async(userId, {rejectWithValue}) => {
        try{
            const response = await api.getStoriesByUser(userId);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// Delete story from signed in user
export const deleteStory = createAsyncThunk(
    "story/deleteStory", 
    async({id, toast}, {rejectWithValue}) => {
        try{
            const response = await api.deleteStory(id);
            // send success
            toast.success("Story deleted successfully");
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// Update story action for logged in user
export const updateStory = createAsyncThunk(
    "story/updateStory", 
    async({id, updatedStoryData, toast, navigate}, {rejectWithValue}) => {
        try{
            const response = await api.updateStory(updatedStoryData, id);
            toast.success("Story updated successfully");
            navigate("/");
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// Home page search story query action
export const searchStory = createAsyncThunk(
    "story/searchStory", 
    async(searchQuery, {rejectWithValue}) => {
        try{
            const response = await api.getStoriesBySearch(searchQuery);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// fetch stories with additional parameters
export const getStoriesByTag = createAsyncThunk(
    "story/getStoriesByTag", 
    async(tag, {rejectWithValue}) => {
        try{
            const response = await api.getStoriesByTag(tag);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

// Related story fetch through current tags 
export const getRelatedStories = createAsyncThunk(
    "story/getRelatedStories", 
    async(tags, {rejectWithValue}) => {
        try{
            const response = await api.getRelatedStories(tags);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const likeStory = createAsyncThunk(
    "story/likeStory", 
    async({ _id }, {rejectWithValue}) => {
        try{
            const response = await api.likeStory(_id);
            return response.data;
        }
        catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const storySlice = createSlice({
    name: "story",
    initialState: {
        story: {}, // single story data
        stories: [], // all story which would be in mongodb database
        userStories: [], // all the stories created by the logged in user
        tagStories: [],
        relatedStories: [],
        error: "",
        loading: false,
        currentPage: 1,
        numberOfPages: null
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [getStories.pending]: (state, action) => {
            state.loading = true;
        },
        [getStories.fulfilled]: (state, action) => {
            state.loading = false;
            state.stories = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getStories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getStoriesByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getStoriesByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userStories = action.payload;
        },
        [getStoriesByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateStory.pending]: (state, action) => {
            state.loading = true;
        },
        [updateStory.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const { arg: {id}} = action.meta;
            if(id) {
                state.userStories = state.userStories.map((item) => item._id === id ? action.payload : item);
                state.stories = state.stories.map((item) => item._id === id ? action.payload : item);
            }
            state.userStories = action.payload;
        },
        [updateStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [createStory.pending]: (state, action) => {
            state.loading = true;
        },
        [createStory.fulfilled]: (state, action) => {
            state.loading = false;
            state.stories = [action.payload];
        },
        [createStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getStory.pending]: (state, action) => {
            state.loading = true;
        },
        [getStory.fulfilled]: (state, action) => {
            state.loading = false;
            state.story = action.payload;
        },
        [getStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteStory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteStory.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const { arg: {id}} = action.meta;
            if(id) {
                state.userStories = state.userStories.filter((item) => item._id !== id);
                state.stories = state.stories.filter((item) => item._id !== id);
            }
        },
        [deleteStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [updateStory.pending]: (state, action) => {
            state.loading = true;
        },
        [updateStory.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const { arg: {id}} = action.meta;
            if(id) {
                state.userStories = state.userStories.map((item) => item._id === id ? action.payload : item);
                state.stories = state.stories.map((item) => item._id === id ? action.payload : item);
            }
            state.userStories = action.payload;
        },
        [updateStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [searchStory.pending]: (state, action) => {
            state.loading = true;
        },
        [searchStory.fulfilled]: (state, action) => {
            state.loading = false;
            state.stories = action.payload;
        },
        [searchStory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [getStoriesByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getStoriesByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagStories = action.payload;
        },
        [getStoriesByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [getRelatedStories.pending]: (state, action) => {
            state.loading = true;
        },
        [getRelatedStories.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedStories = action.payload;
        },
        [getRelatedStories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [likeStory.pending]: (state, action) => {},
        [likeStory.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: {_id}} = action.meta;
            if(_id) {
                state.stories = state.stories.map((item) => item._id === _id ? action.payload : item);
            }
            state.userStories = action.payload;
        },
        [likeStory.rejected]: (state, action) => {
            state.error = action.payload.message;
        },
    }
});

export const {setCurrentPage} = storySlice.actions; 

export default storySlice.reducer;