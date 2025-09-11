const express = require('express');
const { connectToDatabase } = require('./Config/databaseConfig');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { saveUrl, deleteUrl } = require('./Controllers/saveurlController');
const useragent = require('express-useragent');
const { clickUrl, getUrlData } = require('./Controllers/clickurlController');
const { connectToCloudinary } = require('./Config/cloudinaryConfig');
const { signupController } = require('./Controllers/signupController');
const fileUpload = require('express-fileupload');
const { loginController } = require('./Controllers/loginController');
const { getUserByEmail } = require('./Controllers/userController');

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}));

app.use(useragent.express());

app.use(cors()); 

app.set('trust proxy', true);


app.use(express.json());

app.get('/', (req,resp) => {
    resp.send('hi i got activated what you want???')
})

connectToDatabase();
connectToCloudinary();

app.post('/saveurl',saveUrl);
app.get('/redirect/:id',clickUrl);
app.post('/signup',signupController);
app.post('/login',loginController);
app.get('/url/:id',getUrlData);
app.post('/getuser',getUserByEmail);
app.delete('/deleteurl/:id',deleteUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})