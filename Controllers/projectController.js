const projects = require('../Models/projectModel')

//project add cheyyanulla communication here
exports.addProjectController = async(req,res) => {
    console.log("Inside add project function" );
    const {title,languages,github,website,overview} = req.body
    const userId = req.payload
    const projectImg = req.file.filename
    console.log(title,languages,github,website,overview,projectImg,userId);
    try {
        const exisitingProject = await projects.findOne({github})
            if (exisitingProject) {
                res.status(406).json("Project already in our database, Add another one !!")
            } else {
                const newProject = new projects({
                    title,languages,github,website,overview,projectImg,userId
                })
                await newProject.save()
                res.status(200).json(newProject)
            }
    } catch (err) {
        res.status(401).json(err)
    }
}

// add aakiya projects GET aavan
// for home project
exports.getHomeProjects = async (req,res) => {
    console.log("Inside getHomeProjects");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//all projects
exports.allProjectsController = async (req,res) => {
    console.log("Inside allProjects");
    try {
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}


//user projects
exports.getuserProjectsController = async (req,res) => {
    console.log("Inside getuserProjectsController");
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}
