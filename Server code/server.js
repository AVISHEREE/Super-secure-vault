const express = require('express');
const cors = require('cors');
const connectDB = require('./db/mongoose.connect');
const verifyToken = require('./middlewares/auth.middleware');
const bodyParser = require('body-parser');
const userRouter = require('./routes/auth.route');
const vaultRouter = require('./routes/vault.route');

const app = express();
require('dotenv').config();
app.use(express.json({ limit: '30mb' })); 
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors())
app.use(bodyParser.json());
connectDB();
app.get('/',(req,res)=>{
    res.send("hii")
})
app.get('/a',verifyToken,(req,res)=>{
    res.send("hii")
})
app.use('/user',userRouter);
app.use('/vault',vaultRouter);
app.listen(3000,()=>{
    console.log("Listening on http://localHost:3000/")
})