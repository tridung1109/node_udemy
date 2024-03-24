
const { createProjectService, getAllProject } = require("../service/projectsService");

const aqp = require('api-query-params');

module.exports = {
    postCreateProject: async(req, res) => {
        
        let project = await createProjectService(req.body);
    
        return res.status(200).json({
            errorCode: 0,
            data: project
        });
    },
   
    getAllProjectAPI : async (req, res) => {

        let project = await getAllProject(req.query);
    
        if(project){

            return res.status(200).json({
                errorCode: 0,
                data: project
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: project
            })
        }
    
    },
    updateCustomerAPI : async (req, res) => {

        let {name, email, address, phone} = req.body;
        const dataCustomer = {name, email, address, phone};
        
        let customers = await updateCustomerService(req.body.customerId, dataCustomer);
    
        if(customers){

            return res.status(200).json({
                errorCode: 0,
                data: customers
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: customers
            })
        }
    
    },
    deleteACustumerAPI : async (req, res) => {

        let customers = await deleteCustomesService(req.body.id);
    
        if(customers){

            return res.status(200).json({
                errorCode: 0,
                data: customers
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: customers
            })
        }
    
    },
    deleteCustumersAPI : async (req, res) => {

        let customers = await deleteACustomeService(req.body.customerId);
    
        if(customers){

            return res.status(200).json({
                errorCode: 0,
                data: customers
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: customers
            })
        }
    
    }
}