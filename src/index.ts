import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {runDb} from "./repositories/db";
import {blogsRouter} from "./routers/blogs-router";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/blogs", blogsRouter);

const startApp = async () => {
	await runDb();
	app.listen(PORT, () => {
		console.log(`Server has been started on port: ${PORT}!!!`);
	});
}

startApp();
