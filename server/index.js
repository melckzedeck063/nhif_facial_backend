const express = require('express');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');

const globalErrorHandler =  require('./controllers/errorController')

dotenv.config({ path: './.env' })

const multer = require('multer');
// // const upload = multer({ dest: 'uploads/posts' });

const  multerStorage =  multer.diskStorage({
    destination :  (req,file,cb) => {
         cb(null,'./uploads/posts')
     },
     filename : (req,file,cb) => {
         console.log(file)
         const ext =  file.mimetype.split('/')[1];
         const rand =  Math.floor(Math.random() * 1E9);
         cb(null, `product-${rand}-${Date.now()}.${ext}`)
     }
 })

 const multerFilter =  (req,file, cb) =>  {
     console.log(file)
     if(file.mimetype.startsWith('image')){
         cb(null,true)
     }
     else{
         cb(new AppError('The  file  you  uploaded is not supported', 400))
    }
 }

 const  upload =  multer({
     storage : multerStorage,
     fileFilter : multerFilter
 })


const app = express();

app.use(bodyParser.json({limit: '50kb'}))
app.use(cookieParser())
app.use(cors())

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// const MongoUrl = `mongodb://localhost:27017/nhif_facial_expression`;
 const  MongoUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0-shard-00-00.xwzd4.mongodb.net:27017,cluster0-shard-00-01.xwzd4.mongodb.net:27017,cluster0-shard-00-02.xwzd4.mongodb.net:27017/nhif_facial_expression?ssl=true&replicaSet=atlas-khbsbw-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(MongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser : true
})

MongoClient.connect(MongoUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw err
    }
    console.log("Succesfull connected to the database")
})

const  userRouter = require('./routes/userRoute');
const  requestRouter =   require('./routes/request_route');
const dependantRouter = require('./routes/dependant_route')
const signalRouter =   require('./routes/signal_route');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/request', requestRouter);
app.use('/api/v1/dependant', dependantRouter)
app.use('/api/v1/signal', signalRouter);


app.post('/api/v1/posts/upload_photo', upload.single('photo'), (req, res) => {
    // do something with the photo
    console.log(req.file)
    const path =  req.file.path;
    if(!path || path === undefined){
        console.log("something went wrong")
    }

    res.status(201).json({
        status : "successfull",
        message : "photo uploaded succesfully",
        data : path
    })
  });

app.use('/uploads', express.static('uploads'));

app.use(globalErrorHandler);

// console.log(Date.now().toString())

const port = process.env.PORT || 4001;

app.get('/',(req,res)=> res.send(`App is running from port : ${port}`));

app.listen(port, () => {
    console.log(`Server running from port ${port}`)
})