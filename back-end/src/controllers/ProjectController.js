const Project = require('../models/Project');

module.exports = {
    async store(req, res) {
        try {
            const { title, description, createdBy } = req.body;
            const existentProject = await Project.findOne({title});

            if (!existentProject) {
                const project = await Project.create({
                    title: title,
                    description: description,
                    createdBy: createdBy
                })
                return res.json(project);
            } else {
                return res.status(400).json({
                    message: "Someone has already created a project with that name, try another one!"
                })
            }
        } catch (error) {
            throw Error(error)
        }
    },

    async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            const projects = await Project.find({ userId })

            if (projects) {
                return res.json(projects);
            } else {
                return res.status(400).json({
                    message: "Seems like you don't haven't created or joined any projects yet, might be time to get up on the horse!"
                })
            }
        } catch (error) {
            throw Error(error);
        }
    },

    async getById(req, res) {
        try {
            const { projectId } = req.params;
            const project = await Project.findById(projectId);

            return res.status(200).json(project);

        } catch (error) {
            return res.status(400).json({
                message: "Could not find any project with that id."
            })
        }
    }
}