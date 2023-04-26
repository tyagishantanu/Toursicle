import UserModel from './../models/user.js';

// Service for creating a new user in database
export const create = (user) => {
    const newUser = new UserModel(user);
    return newUser.save();
}