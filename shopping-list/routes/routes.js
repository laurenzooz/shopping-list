import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";

const router = new Router();

router.get("/", indexController.showIndex);

export { router };
