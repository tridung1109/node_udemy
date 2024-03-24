const express = require('express');
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
     deleteUserAPI, postUploadSingleFileAPI,
      postUploadMultipleFileAPI } = require('../controllers/apiController');
const { postCreateCustomer, postCreateArrayCustomer, getCustomersAPI,
      updateCustomerAPI, deleteACustumerAPI,
      deleteCustumersAPI } = require('../controllers/customerColtroller');
const { postCreateProject, getAllProjectAPI } = require('../controllers/projectsColtroller');
const { postCreateTaskAPI, getAllTaskAPI } = require('../controllers/tasksColtroller');
const routerApi = express.Router();


routerApi.get('/users', getUsersAPI);
routerApi.post('/users', postCreateUserAPI);
routerApi.put('/users', putUpdateUserAPI);
routerApi.delete('/users', deleteUserAPI);

routerApi.post('/file', postUploadSingleFileAPI);
routerApi.post('/files', postUploadMultipleFileAPI);

routerApi.post('/customer', postCreateCustomer);
routerApi.post('/customers-many', postCreateArrayCustomer);
routerApi.get('/customers', getCustomersAPI);
routerApi.put('/customers', updateCustomerAPI);
routerApi.delete('/customers', deleteACustumerAPI);
routerApi.delete('/customers-mamy', deleteCustumersAPI);

routerApi.post('/projects', postCreateProject);
routerApi.get('/projects', getAllProjectAPI);

routerApi.post('/tasks', postCreateTaskAPI);
routerApi.get('/tasks', getAllTaskAPI);

routerApi.get('/customers?name=dung', (req, res) => {
      console.log(req.query);
      res.send('success');
});

routerApi.get('/customers/:name/:address', (req, res) => {
      console.log(req.params);
      res.send('success');
});



module.exports = routerApi;
