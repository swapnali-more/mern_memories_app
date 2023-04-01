import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import dotenv from 'dotenv'
import { USERNAME, PASSWORD } from "./dbCredentials.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

const username = encodeURIComponent(USERNAME);
const password = encodeURIComponent(PASSWORD);

const CONNECTION_URL = `mongodb+srv://${username}:${password}@memories.udpiyjf.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

//mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`)))
.catch((err) => console.log("error", err.message));

//mongoose.set('useFindAndModify', false);