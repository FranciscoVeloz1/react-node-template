import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";

//Importing routes
import { authRoutes } from "./routes";

//Initializations
const app: Application = express();

//Settings
app.set("port", process.env.PORT || 4000);

//Public
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", authRoutes)

app.get("/*", function (_req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send("error");
    }
  });
});

export default app;
