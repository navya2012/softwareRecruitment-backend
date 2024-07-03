
require("dotenv").config();

const express = require("express")

const app= express()

const port = process.env.PORT || 5000

//middleware
app.use(express.json());

//db connection
require('./db/connection')

//require routes
const userRoutes = require('./routes/userRoutes')

//routes 
app.use('/api', userRoutes )


app.get("/", (req,res) => {
    res.send('hello')
})

app.listen(port, async () => {
    console.log(`server is running at port number ${port}`)
})