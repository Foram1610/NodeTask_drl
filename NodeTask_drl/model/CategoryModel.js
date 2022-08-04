const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    menu : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Menu',
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Category',CategorySchema,'Category')