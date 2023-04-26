import express from "express";
import StoryModel from "../models/story.js";
import * as storyservices from "../services/story-services.js"
import mongoose from "mongoose";

// Method to call service which creates new story in database
export const createStory = async (req, res) => {
    const story = req.body;
    const newStory = new StoryModel({
        ...story,
        createdBy: req.userId,
        createdAt: new Date().toISOString()
    });

    try{
        const result = await storyservices.create(newStory);
        res.status(201).json(result);
    }
    catch(e)
    {
        res.status(404).json({message: "Something went wrong"});
    }
};

// Method to call service which gets stories from database with pagination
export const getStories = async (req, res) => {
    const {page} = req.query;
    try
    {
        // const result = await storyservices.getall();
        // res.status(200).json(result);
        const limit = 8;
        const startIndex = (Number(page)-1) * limit;
        const stories = await StoryModel.find().limit(limit).skip(startIndex);
        const total = await StoryModel.countDocuments({});
        res.json({
            data: stories,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total/limit)
        });

    }
    catch(e)
    {
        res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which gets story with id from database
export const getStory = async (req, res) => {
    const {id} = req.params;
    try
    {
        const result = await storyservices.get(id);
        res.status(200).json(result);
    }
    catch(e)
    {
        res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which gets story with username from database
export const getStoriesByUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({message: "User does not exists"})
    }
    const stories = await storyservices.getByUser(id);
    res.status(200).json(stories);
}

// Method to call service which deletes a story in database
export const deleteStory = async (req, res) => {
    const {id} = req.params;
     try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(404).json({message: `No story exist with id: ${id}`});
        }
        await storyservices.remove(id);
        res.json({message: "Story deleted successfully"});
     }
     catch(e)
     {
        res.status(404).json({message: "Something went wrong"});
     }
}

// Method to call service which updates a story in database
export const updateStory = async (req, res) => {
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;
    try {
       if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: `No story exist with id: ${id}`});
       }

       const updatedStory = {
        creator,
        title,
        description,
        tags,
        imageFile,
        _id: id
       }
       await storyservices.update(id, updatedStory);
       res.json(updateStory);
    }
    catch(e)
    {
       res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which searches story in database
export const getStoriesBySearch = async (req, res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const stories = await storyservices.getBySearch(title);
        res.json(stories);
    } catch(error) {
        res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which searches story by tag in database
export const getStoriesByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const stories = await storyservices.getByTag(tag);
        res.json(stories);
    } catch(error) {
        res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which gets related stories in database
export const getRelatedStories = async (req, res) => {
    const tags = req.body;
    try {
        const stories = await storyservices.getByTag(tags);
        res.json(stories);
    } catch(error) {
        res.status(404).json({message: "Something went wrong"});
    }
}

// Method to call service which updates like count in database
export const likeStory = async (req, res) => {
    const {id} = req.params;
    try {
        if(!req.userId) {
            return res.json({message: "User is not authenticated."});
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: `No story exist with id: ${id}`});
        }

        const story = await storyservices.get(id);
        const index = story.likes.findIndex((id) => id === String(req.userId));
        if(index === -1) {
            story.likes.push(req.userId);
        } else {
            story.likes = story.likes.filter((id) => id !== String(req.userId));
        }
        const updatedStory = await storyservices.update(id, story);

        res.status(200).json(updatedStory);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}