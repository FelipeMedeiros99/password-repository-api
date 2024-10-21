import express, { json } from "express";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { deleteExpiredTokens } from "./repositories/userRepository";

const app = express();
app.use(json())

app.use(router)
app.use(errorHandler)

setInterval(deleteExpiredTokens, 60 * 1000)

app.listen(5000, () => console.log("app running at port 5000"))

