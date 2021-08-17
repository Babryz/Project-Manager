const mongoose = require('mongoose');

// const ProjectSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     createdBy: String,
//     joinedBy: Array
// })

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    users: [
        {
            id: String,
            creator: Boolean,
            admin: Boolean
        }
    ],
})

module.exports = mongoose.model('Project', ProjectSchema);
