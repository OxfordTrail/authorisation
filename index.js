const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routers
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');
const verifyToken = require('./routes/verifyToken');
dotenv.config();
//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () =>{
        console.log('Connected to db')
    }
);


//Route Middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', verifyToken);

//Routers
app.use('/api/posts', postRoute);

app.listen(3000, () =>{
    console.log('Server is UP and listening on 3000');
})