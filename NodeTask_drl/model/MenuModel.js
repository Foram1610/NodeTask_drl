const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    availability :[{
        type:String,
        required:true
    }],
    timeFrom : {
        type:String,
        required:true
    },
    timeTo : {
        type:String,
        required:true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Menu',MenuSchema,'Menu')