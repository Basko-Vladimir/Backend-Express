import { header } from "express-validator";

const validCredentials = "Basic YWRtaW46MTIzNA==";

export const checkAuthorization = header("authorization")
	.exists().withMessage("You are not authorized!")
	.equals(validCredentials).withMessage("Incorrect Login or Password");
