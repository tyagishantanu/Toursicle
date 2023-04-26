import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user-routes.js";
import storyRouter from "./routes/story-routes.js";

const app = express();

//middleware to help log the console
app.use(morgan("start"));

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/users", userRouter); // http://localhost:8000/users/
app.use("/story", storyRouter); // http://localhost:8000/story/

// Database Connection
const MONGODM_URL = "mongodb://localhost:27017/tour_db";
mongoose
  .connect(MONGODM_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connection Established!');
  }).catch((error) => console.log(`${error} did not connect to Database.`));

export default app;