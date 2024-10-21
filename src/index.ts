import express, { json } from "express";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(json())

app.use(router)
app.use(errorHandler)

app.listen(5000, ()=>console.log("app running at port 5000"))

