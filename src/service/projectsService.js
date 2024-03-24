const Project = require('../models/project');
const aqp = require('api-query-params');

const createProjectService = async(projectData) =>{

    try {
        
        if(projectData.type === 'EMPTY-PROJECT'){
            
            let project = await Project.create(projectData);

            return project;
        }
        if(projectData.type === 'ADD-USERS'){
            
            let myProject = await Project.findById(projectData.project).exec();

            console.log(myProject);

            for(let i = 0; i < projectData.userArray.length; i ++){
                myProject.usersInfo.push(projectData.userArray[i]);
            }
            
            
            let project = await myProject.save();

            return project;
        }

        if(projectData.type === 'REMOVE-USERS'){
            
            let myProject = await Project.findById(projectData.project).exec();

            for(let i = 0; i < projectData.userArray.length; i ++){
                myProject.usersInfo.pull(projectData.userArray[i]);
            }
            
            let project = await myProject.save();

            return project;
        }

        if(projectData.type === 'ADD-TASK'){
            
            let myProject = await Project.findById(projectData.project).exec();

            console.log(myProject);

            for(let i = 0; i < projectData.taskArray.length; i ++){
                myProject.tasks.push(projectData.taskArray[i]);
            }
            
            
            let project = await myProject.save();

            return project;
        }
    
        
    } catch (error) {

        console.log(error);
        return null
    }
}


const getAllProject = async(queryString) =>{

    try {

        limit = 3;
        let offset = (queryString.page - 1) * limit;
        let query = {};
        const {filter, population} = aqp(queryString);
        console.log(population);
        delete filter.page;

        if(filter){
            query = filter;
        }
        
        let projecjs = await Project.find(query).populate(population).skip(offset).limit(limit);
        return projecjs;
        
    } catch (error) {
        console.log(error);
        return null
    }
}

const updateCustomerService = async(custommerId, dataCustomer) =>{

    try {
        
        let customer = await Customers.updateOne({_id: custommerId}, dataCustomer);
        
        return customer;
        
    } catch (error) {
        return null
    }
}

const deleteACustomeService = async(custommerId) =>{

    try {
        
        let customer = await Customers.deleteById(custommerId);
        
        return customer;
        
    } catch (error) {
        return null
    }
}

const deleteCustomesService = async(custommerId) =>{

    try {
        
         await Customers.deleteMany({_id: {$in: custommerId}}, (err, result) =>{
            return result;
        });
        
    } catch (error) {
        return null
    }
}

module.exports = {
    createProjectService,
    getAllProject,
    updateCustomerService,
    deleteACustomeService,
    deleteCustomesService
}