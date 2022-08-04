const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
require('./connection')
const Sign_up_in = require('./routes/SignUp_SignIn')
const Me = require('./routes/Me')
const authMiddleware = require('./middleware/authMiddleware')
const MainAPIs = require('./routes/Authenticated/APIs')

//middleware
app.use(express.json());
app.use(cors());

app.use('/api/Sign_up_in',Sign_up_in)
app.use('/api/me',authMiddleware,Me)
app.use('/api/Main',authMiddleware,MainAPIs)


app.listen(port,()=>{console.log(`Server running on port ${port}`);})