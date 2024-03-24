const Customers = require("../models/customers");
const aqp = require('api-query-params');

const createCustomerService = async(customerData) =>{

    try {
        
        let customer = await Customers.create({
            name: customerData.name,
            email: customerData.email,
            address: customerData.address,
            phone: customerData.phone,
            description: customerData.description,
            image: customerData.strImage
        });
    
        return customer;
    } catch (error) {
        return null
    }
}

const createArrayCustomerService = async(arr) =>{

    try {
        
        let customer = await Customers.insertMany(arr);
        return customer;

    } catch (error) {
        return null
    }
}

const getAllCustomers = async(queryString) =>{

    try {

        limit = 3;
        let offset = (queryString.page - 1) * limit;
        let query = {};
        const {filter} = aqp(queryString);
        delete filter.page;

        if(filter){
            query = filter;
        }
        
        let customers = await Customers.find(query).skip(offset).limit(limit);
        return customers;
        
    } catch (error) {
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
    createCustomerService,
    createArrayCustomerService,
    getAllCustomers,
    updateCustomerService,
    deleteACustomeService,
    deleteCustomesService
}