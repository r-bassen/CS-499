const mongoose = require('mongoose');
const User = mongoose.model('users'); 

// GET a list of all users
const userList = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // don’t send passwords
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET user by ID
const usersFindById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST - Add new user
const usersAddUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        // Don't send password back
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT - Update user by ID
const usersUpdateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE user by ID
const usersDeleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send(); // 204 No Content on successful delete
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    userList,
    usersFindById,
    usersAddUser,
    usersUpdateUser,
    usersDeleteUser
};