import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { checkAuthorization } from "./middlewares/check-authorization";
import { checkValidationErrors } from "./middlewares/check-validation-errors";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/",
	checkAuthorization,
	checkValidationErrors,
	(req: Request, res: Response) => {
		res.send("ok");
	});

app.listen(PORT, () => {
	console.log(`Server has been started on port: ${PORT}`);
});
