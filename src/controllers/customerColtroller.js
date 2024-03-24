
const { createCustomerService, createArrayCustomerService,
     getAllCustomers, updateCustomerService, deleteACustomeService, deleteCustomesService } = require("../service/customerService");
const { uploadMultipleFile, uploadSingleFile } = require("../service/fileService");
const aqp = require('api-query-params');
const Joi = require('joi');

module.exports = {
    postCreateCustomer: async(req, res) => {
        let {email, name, address, phone, description} = req.body;
        let image = null;
        let strImage = '';


        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        
            address: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
            phone: Joi.string()
            .pattern(new RegExp('^[0-9]{8,11}$')),
        
            email:
                Joi.string().email(),
        
            description: Joi.string()
        
        })

        const {error} = schema.validate(req.body, {abortEarly: false});

        console.log(error);

        if (!req.files || Object.keys(req.files).length === 0) {
            
        }else{
            fileObject = req.files.image;
            if(Array.isArray(fileObject)){
    
                image = await uploadMultipleFile(fileObject);
                
                for(let i = 0; i < image.detail.length; i++){
                    strImage += `${image.detail[i].fileName},`
                }
                
            }else{
                image = await uploadSingleFile(fileObject);
    
                strImage = `${image.detail.fileName}`;
                
            }
        }
    
        const customerData = {
            name, email, address, phone, description, strImage
        };
        let customer = await createCustomerService(customerData);
    
        return res.status(200).json({
            errorCode: 0,
            data: customer
        });
    },
    postCreateArrayCustomer: async(req, res) => {
        
        let customer = await createArrayCustomerService(req.body.customer);
    
        if(customer){

            return res.status(200).json({
                errorCode: 0,
                data: customer
            });
        }else{
            return res.status(200).json({
                errorCode: -1,
                data: customer
            })
        }
    },
    getCustomersAPI : async (req, res) => {

        let customers = await getAllCustomers(req.query);
    
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