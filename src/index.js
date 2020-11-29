const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 3000 ;

//middleware demo

// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     next();
// })

//for denoting site maintenance, next() function not used
// app.use((req, res, next) => {
//     res.status(503). send('Site is currenlty under maintenace')
// })


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("Server is up on port "+ port);
})