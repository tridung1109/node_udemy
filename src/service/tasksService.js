const Task = require('../models/task');
const aqp = require('api-query-params');

const createTasksService = async(taskData) =>{

    try {
        
        if(taskData.type === 'EMPTY_TASK'){
            
            let task = await Task.create(taskData);

            return task;
        }
        
    } catch (error) {

        console.log(error);
        return null
    }
}


const getAllTask = async(queryString) =>{

    try {

        limit = 3;
        let offset = (queryString.page - 1) * limit;
        let query = {};
        const {filter} = aqp(queryString);
        delete filter.page;

        if(filter){
            query = filter;
        }
        
        let tasks = await Task.find(query).skip(offset).limit(limit);
        return tasks;
        
    } catch (error) {
        console.log(error);
        return null
    }
}


module.exports = {
    createTasksService,
    getAllTask
}