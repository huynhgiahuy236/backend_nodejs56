import express from "express";
import rootRouter from "./src/routers/root.router.js";

// commonjs --es5  
// const app = require("express")
// module -- es6
const app = express()

// url: localhost:3069/api/list-article
app.use("/api", rootRouter)



const PORT = 3069
app.listen(PORT, () => {
    console.log(`server online at localhost ${PORT}`)
})


