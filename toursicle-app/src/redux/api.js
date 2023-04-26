import { applyMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_API = axios.create({baseURL: "http://localhost:8000"});

BASE_API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile"))
    {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
})

export const signIn = (loginData) => BASE_API.post("/users/signin", loginData);

export const signUp = (signUpData) => BASE_API.post("/users/signup", signUpData);

export const createStory = (storyData) => BASE_API.post("/story", storyData); 

export const getStories = (page) => BASE_API.get(`/story?page=${page}`);

export const getStory = (id) => BASE_API.get(`/story/${id}`);

export const deleteStory = (id) => BASE_API.delete(`/story/${id}`);

export const updateStory = (updatedStoryData, id) => BASE_API.patch(`/story/${id}`, updatedStoryData);

export const getStoriesByUser = (userId) => BASE_API.get(`/story/userStories/${userId}`);

export const getStoriesBySearch = (searchQuery) => BASE_API.get(`/story/search?searchQuery=${searchQuery}`);

export const getStoriesByTag = (tag) => BASE_API.get(`/story/tag/${tag}`);

export const getRelatedStories = (tags) => BASE_API.post(`/story/relatedStories`, tags);

export const likeStory = (id) => BASE_API.patch(`/story/like/${id}`);