const mongoose = require('mongoose')

mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(()=>{console.log('Connected to MongoDB!!')})
.catch(()=>console.log('Somthing went wrong in database connection!!'))

module.exports = mongoose;