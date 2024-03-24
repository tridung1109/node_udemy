const connection = require('../config/database');
const {getAllUsers, getUser, postUpdate, postDelete} = require('../service/CRUDService');
const User = require('../models/User');

const getHomePage = async (req, res) => {

    let results = await User.find({});
    return res.render('home.ejs', {listUsers: results});
}

const createUser = (req, res) => {
    return res.render('create.ejs');
}

const getUpdate = async (req, res) => {

    let userId = req.params.userId;
    let result = await User.findById(userId).exec();
    
    res.render('edit.ejs', {userEdit: result});
}

const postUpdateUser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    console.log(userId);

    await User.updateOne({_id: userId}, { name: name, email: email, city: city });
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {

    let userId = req.params.userId;
    let result = await User.findById(userId).exec();

    // console.log(result);
    res.render('delete.ejs', {userEdit: result});
}

const postHandleRemoveUser = async (req, res) => {

    let userId = req.body.userId;

    let rs = await User.deleteOne({_id: userId});

     console.log(rs);
    res.redirect('/');
}

const postCreateUser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    await User.create({
        name,
        email,
        city
    });


    res.send('Create success');
}



module.exports = {
    getHomePage,
    createUser,
    postCreateUser,
    getUpdate,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
};