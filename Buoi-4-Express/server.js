import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import { json } from "sequelize";

// commonjs --es5  
// const app = require("express")
// module -- es6
const app = express()
app.use(express.json())
// url: localhost:3069/api/list-article
app.use("/api", rootRouter)
app.use(appError)


const PORT = 3069
app.listen(PORT, () => {
    console.log(`server online at localhost ${PORT}`)
})


