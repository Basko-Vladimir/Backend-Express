import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { clearVideos, videosRouter } from "./routers/videos/videos-router";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/videos", videosRouter);

app.delete("/testing/all-data", (req: Request, res: Response) => {
	clearVideos();
	res.send(204);
});

app.listen(PORT, () => {
	console.log(`Server has been launched on port ${PORT}`);
});