const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    joinedBy: Array
})

module.exports = mongoose.model('Project', ProjectSchema);