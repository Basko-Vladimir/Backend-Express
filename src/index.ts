import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {runDb} from "./repositories/db";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {testingRouter} from "./routers/testing-router";
import {usersRouter} from "./routers/users-router";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/testing", testingRouter);

const startApp = async () => {
	await runDb();
	app.listen(PORT, () => {
		console.log(`Server has been started on port: ${PORT}!!!`);
	});
}

startApp();
