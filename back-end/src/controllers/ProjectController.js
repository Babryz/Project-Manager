const Project = require('../models/Project');

module.exports = {
    async store(req, res) {
        try {
            const { title, description, creator } = req.body;
            const existentProject = await Project.findOne({title});

            if (!existentProject) {
                const project = await Project.create({
                    title: title,
                    description: description,
                    users: [
                        {
                            user_id: creator,
                            creator: true,
                            admin: true,
                        }

                    ]
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

    async getAllProjects(req, res) {
        try {
            const projects = await Project.find();

            if (projects) {
                return res.status(200).json(projects);
            } else {
                return res.status(400).json({
                    message: 'Could not retrieve projects, try refreshing the page'
                })
            }
        } catch (error) {
            
        }
    },

    async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            const projects = await Project.find({ createdBy: userId })

            if (projects.length !== 0) {
                return res.json(projects);
            } else {
                return res.status(400).json({
                    message: "You haven't created any projects yet, might be time!"
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
