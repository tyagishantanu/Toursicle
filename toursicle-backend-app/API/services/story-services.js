import StoryModel from "../models/story.js";

// Service for creating new story in database
export const create = (story) => {
    const newStory = new StoryModel(story);
    return newStory.save();
}

// Service for getting all stories in database
export const getall = (params) => {
    const allStories = StoryModel.find(params).exec();
    return allStories;
}

// Service for getting story with id in database
export const get = async (id) => {
    const story = StoryModel.findById(id).exec();
    return story;
}

// Service for getting all stories by user in database
export const getByUser = async (id) => {
    const stories = StoryModel.find({ createdBy: id})
    return stories;
}

// Service for deleting a story in database
export const remove = async (id) => {
    const stories = StoryModel.findByIdAndDelete(id)
    return stories;
}

// Service for updating a story in database
export const update = async (id, updatedStory) => {
    const stories = StoryModel.findByIdAndUpdate(id, updatedStory, {new: true});
    return stories;
}

// Service for getting story with title in database
export const getBySearch = async(title) => {
    const stories = StoryModel.find({title});
    return stories;
}

// Service for getting story with tag in database
export const getByTag = async(tag) => {
    const stories = StoryModel.find({tags: {$in: tag}});
    return stories;
}