import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import { json } from "sequelize";
import cors from "cors";
// commonjs --es5  
// const app = require("express")
// module -- es6
const app = express()

// app.use((req, res, next) => {
//     res.setHeader("access-control-allow-methods", "GET,POST,PUT,DELETE,PATH"),
//         (res.setHeader("access-control-allow-headers", "content-type"),
//             res.setHeader("access-control-allow-origin", "http://localhost/3000"))
//     next();
// }
// )
app.use(cors({
    origin: "http://localhost:3000"
}))


app.use(express.json())
// url: localhost:3069/api/list-article
app.use("/api", rootRouter)
app.use(appError)


const PORT = 3069
app.listen(PORT, () => {
    console.log(`server online at localhost ${PORT}`)
})


