import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { bloggersRouter } from "./routers/bloggers-router";
import { postsRouter } from "./routers/posts-router";
import { testingRouter } from "./routers/testing-router";
import { runDb } from "./repositories/db";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/bloggers", bloggersRouter);
app.use("/posts", postsRouter);
app.use("/testing", testingRouter);

const startApp = async () => {
	await runDb();
	app.listen(PORT, () => {
		console.log(`Server has been started on port: ${PORT}!!!`);
	});
}

startApp();
