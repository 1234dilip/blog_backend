const express = require('express')
const dbConnection = require('./connection/connection')
const userRoute = require('./router/user')
const blogRouter = require('./router/blog')
const cors = require('cors');
const path = require('path');

const app = express()
dbConnection()
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoute)
app.use('/blog', blogRouter)

app.listen(3000,() => {
    console.log(`listen port is 3000`)

})