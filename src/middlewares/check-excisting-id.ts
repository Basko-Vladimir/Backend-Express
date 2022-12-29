import { param } from "express-validator";

export const checkExistingId = param("id").exists();