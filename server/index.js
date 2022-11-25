var express = require("express");
const cors = require("cors");

var UserRouter = require("./routes/User")
var LoginRouter = require("./routes/login")

var app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001;

app.use("/User", UserRouter)
app.use("/Login", LoginRouter)

app.listen(port)