const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: String,
    image: String,
    address: String,
    phone: String,
    description: String
}, {
    timestemps: true,
    //  statics: {
    //     findByName(name) {
    //     return this.find({ name: new RegExp(name, 'i') });
    //     }
    // }
});

customerSchema.plugin(mongoose_delete, {overrideMethods: 'all'});

const Customers = mongoose.model('customers', customerSchema);

module.exports = Customers;