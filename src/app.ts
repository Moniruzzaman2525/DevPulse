import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { initDB } from "./_db";


import globalErrorHandler from "./middlewares/globalErrorHandler";

initDB();


const app: Application = express();
const port = config.port;
const db_connection_string = config.db_connection_string;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server running!",
    author: "Md Moniruzzaman",
    port: port,
  });
});




// Error Handler
app.use(globalErrorHandler);


export default app;
