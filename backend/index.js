import express from "express";
import cors from "cors";
import RepliesRoute from "./routes/RepliesRoute.js";
import TweetsRoute from "./routes/TweetsRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import MentionedRoute from "./routes/MentionedRoute.js";
import ORSRoute from "./routes/ORSRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(RepliesRoute);
app.use(TweetsRoute);
app.use(UsersRoute);
app.use(MentionedRoute);
app.use(ORSRoute);

app.listen(5000, ()=> console.log('Server up and running...'));