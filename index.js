const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Routes
const userRoute = require('./routes/UserRoute')

//Middleware
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());


dotenv.config();
const PORT = 5000 || process.env.PORT;

app.use('/api',userRoute);

app.listen( PORT , () => {
    dbConnect();
    console.log("connected to backend ",PORT);
})