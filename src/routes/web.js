const express = require('express');
const router = express.Router();
const {getHomePage, postCreateUser,
    postUpdateUser, createUser, getUpdate,
    postHandleRemoveUser, postDeleteUser} = require('../controllers/homeController');

router.get('/', getHomePage);
router.get('/create', createUser);
router.post('/create-user', postCreateUser);
router.get('/update/:userId', getUpdate);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:userId', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);

module.exports = router;