const connection = require('../config/database');

const getAllUsers = async () =>{
    let [results, fields] = await connection.query(`SELECT * FROM Users`);
    return results;
}

const getUser = async (userId) =>{
    // let [results, fields] = await connection.query(`SELECT * FROM Users WHERE id ?`, [userId]);
    let [result, fields] = await connection.query(`SELECT * FROM Users WHERE id = ${userId}`);
    let user = result && result.length > 0 ? result[0] : {};
    return user;
}

const postUpdate = async (userId, name, email, city) =>{
    let [result, fields] = await connection.query(`
         UPDATE Users SET name = ?, email = ?, city = ? WHERE id = ?
    `, [name, email, city, userId]);

    return result;
}

const postDelete = async (userId) =>{
    let [result, fields] = await connection.query(`DELETE FROM Users WHERE id = ?`, [userId]);
    return result;
}

module.exports = {
    getAllUsers, getUser, postUpdate, postDelete
}