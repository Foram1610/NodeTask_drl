const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    price : Number,
    menu : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Menu',
    },
    category : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    },
    isAvailable : {
        type:Boolean,
        required:true
    },
    allergy :[{
        type:String,
        required:true
    }]
},{
    timestamps : true
})

module.exports = mongoose.model('Dish',DishSchema,'Dish')