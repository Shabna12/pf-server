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
    const searchKey = req.query.search
    const query = {
        languages : {
            $regex:searchKey,
            $options:"i"
        }
    }
    try {
        const allProjects = await projects.find(query)
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


//logic for edit/update projects in EDIT
exports.editProjectController = async (req, res) => {
    console.log("Inside editProjectController");
    const {pid} = req.params
    const {title,languages,github,website,overview,projectImg} = req.body
    const uploadImg = req.file?req.file.filename:projectImg
    const userId = req.payload
    try {
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,github,website,overview,projectImg:uploadImg,userId
        }, {new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//remove/ delete project
exports.removeProjectController = async (req,res) => {
    console.log("Inside removeProjectController");
    const {pid} = req.params
    try {
        const removedProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removedProject)
    } catch (err) {
        res.status(401).json(err)
    }
}