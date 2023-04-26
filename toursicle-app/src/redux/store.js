import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './features/authslice';
import StoryReducer from './features/storySlice';

export default configureStore({
    reducer: {
        auth: AuthReducer,
        story: StoryReducer,
    }
});

