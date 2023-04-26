import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    createdBy: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

    likes: {
        type: [String],
        default: []
    }
});

const StoryModel = mongoose.model("Story", storySchema);

export default StoryModel;