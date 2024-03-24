

const aqp = require('api-query-params');
const { createTasksService, getAllTask } = require("../service/tasksService");

module.exports = {
    postCreateTaskAPI: async(req, res) => {
        
        let task = await createTasksService(req.body);
    
        return res.status(200).json({
            errorCode: 0,
            data: task
        });
    },
   
    getAllTaskAPI : async (req, res) => {

        let task = await getAllTask(req.query);
    
        if(task){

            return res.status(200).json({
                errorCode: 0,
                data: task
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: task
            })
        }
    
    }
}