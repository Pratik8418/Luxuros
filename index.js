const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')

//Routes
const userRoute = require('./routes/UserRoute')

//Middleware
const app = express();
app.use(express.json());

dotenv.config();
const PORT = 5000 || process.env.PORT;

app.use('/api',userRoute);

app.listen( PORT , () => {
    dbConnect();
    console.log("connected to backend ",PORT);
})