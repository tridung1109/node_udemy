
const User = require('../models/User');
const { uploadSingleFile, uploadMultipleFile } = require('../service/fileService');

const getUsersAPI = async (req, res) => {

    let results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}

const postCreateUserAPI = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    let user = await User.create({
        name,
        email,
        city
    });

    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}

const putUpdateUserAPI = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    let user = await User.updateOne({_id: userId}, { name: name, email: email, city: city });

    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}


const deleteUserAPI = async (req, res) => {

    let userId = req.body.userId;

    let user = await User.deleteOne({_id: userId});

    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}

const postUploadSingleFileAPI = async (req, res) => {

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    fileObject = req.files.image;

    let result = await uploadSingleFile(fileObject);

    return res.status(200).json({
        errorCode: 0,
        data: result
    });
}

const postUploadMultipleFileAPI = async (req, res) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    fileObject = req.files.image;
    if(Array.isArray(fileObject)){

        let result = await uploadMultipleFile(fileObject);
        return res.status(200).json({
            errorCode: 0,
            data: result
        });
    }else{
        let result = await uploadSingleFile(fileObject);
        return res.status(200).json({
            errorCode: 0,
            data: result
        });
    }

}


module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI
};