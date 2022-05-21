const express = require("express")
const app = express();
const cors = require("cors")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const chatRoutes = require("./routes/chat")

app.use(cors())
app.use(express.static('public'));
app.use("/public", express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {

    return res.send({
        users: [],
        success: true
    })
})


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)




const server = app.listen(4000, () => {
    console.log("App is running on localhost:4000");
})

require("./socket")(server);
