import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import {runDb} from "./repositories/db";
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {testingRouter} from "./routers/testing-router";
import {usersRouter} from "./routers/users-router";
import {authRouter} from "./routers/auth-router";
import {commentsRouter} from "./routers/comments-router";
import {devicesSessionsRouter} from "./routers/devices-sessions-router";
import {settings} from "./settings";

const PORT = settings.PORT;

const app = express();

app.set('trust proxy', true);

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
app.use("/security", devicesSessionsRouter);
app.use("/testing", testingRouter);

const startApp = async () => {
	await runDb();
	app.listen(PORT, () => {
		console.log(`Server has been started on port: ${PORT}!!!`);
	});
}

startApp();
